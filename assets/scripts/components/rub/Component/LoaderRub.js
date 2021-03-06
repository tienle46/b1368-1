import RubUtils from 'RubUtils';
import app from 'app';
import { destroy } from 'CCUtils';

export default class LoaderRub {
    constructor(node = cc.director.getScene(), hideBg = false, opts = {}) {
        let defaultOptions = {
            position: cc.v2(0, 0)
        };
        this.options = Object.assign({}, defaultOptions, opts);
        this.hideBg = hideBg;
        this.isShowing = true;

        this.node = node && (node.node || node);

        node && this._node();
        this.time = 3000 * 10;

        this._setTimer(this.time);
    }

    _node() {
        let size = this.node.getContentSize();

        this.spinLoaderNode = new cc.Node();
        this.spinLoaderNode.zIndex = app.const.loadingZIndex;
        this.spinLoaderNode.name = 'spin_loader';
        this.spinLoaderNode.setPosition(cc.v2(0, 0));
        this.spinLoaderNode.setContentSize(size.width, size.height);
        this.spinLoaderNode.on(cc.Node.EventType.TOUCH_START, () => true);

        // widget
        let widget = this.spinLoaderNode.addComponent(cc.Widget);
        widget.isAlignOnce = false;

        widget.isAlignTop = true;
        widget.isAlignBottom = true;
        widget.isAlignLeft = true;
        widget.isAlignRight = true;

        widget.top = 0;
        widget.bottom = 0;
        widget.left = 0;
        widget.right = 0;


        // spin_loader -> bgNode
        let bgNode = new cc.Node();
        bgNode.name = 'bg';
        bgNode.setPosition(0, 0);
        bgNode.setContentSize(this.spinLoaderNode.getContentSize());
        bgNode.color = new cc.Color(40, 1, 58);
        bgNode.opacity = 140;
        bgNode.active = !this.hideBg;
        this.spinLoaderNode.addChild(bgNode);

        // bg sprite
        let bgSprite = bgNode.addComponent(cc.Sprite);
        RubUtils.loadSpriteFrame(bgSprite, 'textures/50x50', bgNode.getContentSize());

        // spin_loader -> loader Node
        let loaderNode = new cc.Node();
        loaderNode.name = 'loader';
        loaderNode.setPosition(0, 0);
        loaderNode.setContentSize(cc.size(89, 89));
        this.spinLoaderNode.addChild(loaderNode);

        // loader -> cricle Node
        let circleNode = new cc.Node();
        circleNode.name = 'circle';
        circleNode.setPosition(0, 0);
        circleNode.setContentSize(cc.size(89, 89));
        loaderNode.addChild(circleNode);

        let circleSprite = circleNode.addComponent(cc.Sprite);
        RubUtils.loadSpriteFrame(circleSprite, 'blueTheme/login/loading_rotate_img', circleNode.getContentSize());

        // rotate cricle node
        circleNode.runAction(cc.repeatForever(cc.rotateBy(1.0, 360)));

        // loader -> spade Node
        let spadeNode = new cc.Node();
        spadeNode.name = 'spade';
        spadeNode.setPosition(-0.3, 0);
        spadeNode.setContentSize(72, 70);

        loaderNode.addChild(spadeNode);

        let spadeSprite = spadeNode.addComponent(cc.Sprite);
        RubUtils.loadSpriteFrame(spadeSprite, 'blueTheme/login/loading_fixed_img', spadeNode.getContentSize());

        this.node.addChild(this.spinLoaderNode);
        this.hide();
    }

    show() {
        if (!this.isShowing) {
            this.spinLoaderNode.active = true;
            this._setTimer(this.time);
            this.isShowing = true;
        }
    }

    hide() {
        if (this.isShowing) {
            this.spinLoaderNode.active = false;
            this.clearTimeout();
            this.isShowing = false;
        }
    }

    destroy() {
        this.clearTimeout();
        destroy(this.spinLoaderNode);
    }

    _setTimer(time) {
        this.timer = setTimeout(() => {
            this.spinLoaderNode.active && this.hide();
        }, time);
    }

    clearTimeout() {
        clearTimeout(this.timer);
        this.timer = null;
    }
}