/**
 * Created by Thanh on 10/18/2016.
 */

import app from 'app';
import utils from 'PackageUtils';
import RubUtils from 'RubUtils';
import Component from 'Component';
import Progress from 'Progress';
import { destroy } from 'CCUtils';

let currentPopup

export default class MessagePopup extends Component {
    constructor() {
        super();
        
        this.properties = this.assignProperties({
            acceptButton: cc.Button,
            acceptButtonLabel: cc.Label,
            denyButtonLabel: cc.Label,
            loadingComponent: cc.Node,
            contentComponent: cc.Node,
            popupComponent: cc.Node,
            titleLbl: cc.Label,
            componentName: 'MessagePopup'
        });

        this.messageLabel = {
            default: null,
            type: cc.RichText,
        };
        this.loading = null;
        this.acceptCb = null;
        this.denyCb = null;
        this.requestData = null;
        this.text = '';
        this.loadingHeight = 100;

        this.acceptLabel = null;
        this.denyLabel = null;
    }

    onLoad() {
        super.onLoad();
        this.node.on('touchstart', () => false);
        this.loadingHeight = this.loadingComponent.height;
        this.loading = this.loadingComponent.getComponentInChildren('Progress');
    }

    onEnable() {
        super.onEnable();
        this.node.zIndex = app.const.popupZIndex;
        this.acceptButtonLabel && (this.acceptButtonLabel.string = this.getAcceptText());
        this.denyButtonLabel && (this.denyButtonLabel.string = this.getDenyText());

        if (this.requestData) {
            this._showLoading();
            app.service.send(this.requestData, (data) => {
                // this._hideLoading();

                debug(data);

                if (this.requestData.parser) {
                    let str = this.requestData.parser(data);
                    this.setMessage(str)
                }
            });
        } else {
            this.setMessage(this.text);
        }
    }

    /**
     * @abstract
     */
    static getPrefab() {
        return app.res.prefab.messagePopup;
    }

    onDestroy() {
        super.onDestroy();
        this.freeChunk(this.denyCb, this.acceptCb, this.requestData);
        this.acceptCb = null;
        this.denyCb = null;
        this.requestData = null;
    }

    setMessage(message = "") {
        this._hideLoading();
        this.messageLabel.string = message;
    }
    
    setTitle(message = "") {
        this.titleLbl.string = message;
    }
    
    _showLoading() {
        this.loadingComponent.height = this.loadingHeight;
        this.loading.show(120, () => this.hide());
        this.contentComponent.active = false;
    }

    _hideLoading() {
        this.loadingComponent.height = 0;
        this.loading.hide();
        this.contentComponent.active = true;
    }

    onClickAcceptButton() {
        this.hide();
        
        this.acceptCb && this.acceptCb();
    }

    onClickDenyButton() {
        this.hide();
        this.denyCb && this.denyCb();
    }
    
    hide() {
        if (this.node) {
            this.node.active = false;
            destroy(this.node);
        }
        currentPopup = null;
    }

    getDenyText() {
        return this.denyLabel ? this.denyLabel : app.res.string('label_close');
    }

    getAcceptText() {
        return this.acceptLabel ? this.acceptLabel : app.res.string('label_accept');
    }

    onShow({parentNode, textOrRequestData, denyCb, acceptCb, acceptLabel, denyLabel, title} = {}) {
        this.denyCb = denyCb;
        this.acceptCb = acceptCb;
        this.acceptLabel = acceptLabel;
        this.denyLabel = denyLabel;
        
        title && utils.isString(title) && this.setTitle(title);
            
        if (utils.isString(textOrRequestData)) {
            this.text = textOrRequestData;
            this.requestData = null;
        } else {
            this.text = null;
            this.requestData = textOrRequestData;
        }

        parentNode && parentNode.addChild(this.node, 10000);
    }

    static showCustomPopup(parentNode, textOrRequestData, {acceptLabel, denyLabel, denyCb, acceptCb, componentName = 'MessagePopup', multi = false, title} = {}) {
    
        !multi && currentPopup && currentPopup.hide();

        let args = {parentNode, textOrRequestData, denyCb, acceptCb, acceptLabel, denyLabel, title};
        if (parentNode && textOrRequestData) {
            let prefab = this.getPrefab();

            if (prefab) {
                this._createAndShow(prefab, componentName, args);
            } else {
                RubUtils.loadRes(`popup/${componentName}`, cc.Prefab).then((prefab) => this._createAndShow(prefab, componentName, args));
            }
        }
        window.release(args);
    }

    static show(parentNode, textOrRequestData, denyCb, acceptCb, componentName = 'MessagePopup', multi = false, title) {
        this.showCustomPopup(parentNode, textOrRequestData, {denyCb, acceptCb, componentName, multi, title})
    }

    static _createAndShow(prefab, componentName, args) {
        let messagePopupNode = cc.instantiate(prefab);
        let messagePopup = messagePopupNode.getComponent(`${componentName}`);
        messagePopup.onShow(args);
        //[...args].map(a => a = null);
        currentPopup = messagePopup;
    }
}

app.createComponent(MessagePopup);