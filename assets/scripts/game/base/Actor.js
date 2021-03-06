/**
 * Created by Thanh on 9/15/2016.
 */

import VisibilityActor from 'VisibilityActor';
import Emitter from 'emitter';
import Events from 'GameEvents';
import HttpImageLoader from 'HttpImageLoader';

export default class Actor extends VisibilityActor {
    constructor() {
        super();

        /**
         *
         * @type {ActorRenderer}
         */
        this.renderer = null;
        this.renderData = null;
        this.initiated = false;
        this._eventEmitter = null;
        this.__pendingEmitEvents = null;
        this.autoReleaseHttpImage = true;
    }

    /**
     * Sub class must be call super.onLoad() to init Renderer of actor
     */
    onLoad() {
        super.onLoad();
        this.renderData = {};
        this.__pendingEmitEvents = {};
        this._assertEmitter();
    }

    onEnable(renderer = this.renderer, renderData = this.renderData) {
        super.onEnable();
        this.renderer = renderer;
        this.renderData = Object.assign({}, renderData, {actor: this});
        this.renderer && this.renderer._init(this.renderData);
        this._addGlobalListener();
    }

    start() {
        super.start();
        this.initiated = true;
        this._emitPendingEvent();
    }

    onDisable() {
        super.onDisable();
        this._removeGlobalListener();
        this.removeAllListener();
    }

    onDestroy() {
        super.onDestroy();
        this._removeGlobalListener();
        this.removeAllListener();
        this.autoReleaseHttpImage && HttpImageLoader.clearImage(this.constructor.name);
    }

    emit(name, ...args) {
        if (this.initiated) {
            this._eventEmitter.emit(name, ...args);
        } else {
            this._assertPendingEmitEvents();
            !this.__pendingEmitEvents.hasOwnProperty(name) && (this.__pendingEmitEvents[name] = []);
            this.__pendingEmitEvents[name].push(args);
        }
    }

    on(name, listener, context, priority) {
        this._assertEmitter();
        this._eventEmitter.addListener(name, listener, context, priority);
    }

    off(eventName, listener, context) {
        this._eventEmitter && this._eventEmitter.removeListener(eventName, listener, context);
    }

    removeAllListener() {
        this.off();
    }

    _assertEmitter() {
        !this._eventEmitter && (this._eventEmitter = new Emitter());
    }

    _assertPendingEmitEvents() {
        !this.__pendingEmitEvents && (this.__pendingEmitEvents = {});
    }

    /**
     * This func to add listener to handler data from server or a custom action into game system
     *
     * If event is belong to UI let use listener of cc.Node (node.on, node.off, node.emit, etc...) instead
     *
     * NOTE: Don't forget to add remove this event have been added into _removeGlobalListener func to avoid memory leak
     *
     * Example:
     *      [instanceof actor]._addGlobalListener('adminMessage', () => {
     *          //Show admin message
     *      })
     *
     * @abstract
     */
    _addGlobalListener() {
        this._removeGlobalListener();
        this._addCustomListeners();
        this._assertEmitter();
    }

    /**
     * Use this func to remove listener from game system. System events will be remove from system by default
     * NOTE: Make sure that sub class implementation ```onDestroy``` method must call ```super.onDestroy()```
     * Example:
     *      [instanceof actor]._removeGlobalListener('adminMessage', () => {
     *          //Show admin message
     *      })
     *
     * @abstract
     * @override
     */
    _removeGlobalListener() {
        this._assertEmitter();
        this._removeCustomListeners();
    }

    _emitPendingEvent() {
        this.__pendingEmitEvents && Object.getOwnPropertyNames(this.__pendingEmitEvents).forEach(name => {

            let argArr = this.__pendingEmitEvents[name];
            argArr && argArr.forEach(args => {
                // if (name == Events.ON_GAME_LOAD_DATA_AFTER_SCENE_START) {
                //     console.warn('emit args: ', args);
                // }
                this._eventEmitter.emit(name, ...args);
            });
        });

        this.__pendingEmitEvents = {};
    }

    loadImage(url, cb) {
        return HttpImageLoader.loadImage(url, this.constructor.name, cb);
    }
    
    /**
     * abstracts
     */
    _addCustomListeners(){}
    _removeCustomListeners(){}
}