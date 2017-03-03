import app from 'app';
import Actor from 'Actor';
import TimerRub from 'TimerRub';
import DialogRub from 'DialogRub';
import { isNode } from 'Utils';
import CCUtils from 'CCUtils';
import PromptPopup from 'PromptPopup';

class TopBar extends Actor {
    constructor() {
        super();

        this.properties = {
            ...this.properties,
            highLightNode: cc.Node,
            moreButton: cc.Button,
            eventButton: cc.Button,
            soundControl: cc.Node,
            titleContainerNode: cc.Node,
            dropDownOptions: cc.Node,
            supportPhoneNumberLbl: cc.Label,
            dropDownBgNode: cc.Node,
            promptPrefab: cc.Prefab
        }

        this.intervalTimer = null;
        this.interval = 2000; // display high light message after 2s, if any
    }

    onLoad() {
        super.onLoad();
        this.dropDownBgNode.on(cc.Node.EventType.TOUCH_END, () => this.dropDownOptions.active = false);
    }

    onEnable(){
        super.onEnable();
        this.supportPhoneNumberLbl.string = app.res.string('hotline', {hotline: app.config.supportHotline})
    }

    giveFeedbackClicked() {
        PromptPopup.show(app.system.getCurrentSceneNode(), this.promptPrefab, {
            handler: this._onFeedbackConfirmed.bind(this),
            title: 'Góp ý',
            description: 'Nhập ý kiến',
            acceptLabelText: "Gửi"
        })
    }

    onDestroy() {
        super.onDestroy();
        if (this.intervalTimer) {
            this.intervalTimer.clear();
            this.intervalTimer = null;
        }
    }

    onClickLogout() {
        app.system.confirm(
            app.res.string('really_wanna_quit'),
            null,
            this._onConfirmLogoutClick.bind(this)
        );
        this._hideDropDownMenu()
    }

    onFanpageClicked() {
        cc.sys.openURL(`${app.config.fanpage}`);
        this._hideDropDownMenu()
    }

    _hideDropDownMenu(){
        CCUtils.setVisible(this.dropDownOptions, false)
    }

    onSoundBtnClick() {
        this.soundControl && this.soundControl.getComponent('SoundControl').show();
    }

    handleSettingAction(e) {
        //TODO
    }

    onClickEventAction() {
        let dialog = new DialogRub(this.node.parent, null, { title: 'Sự kiện' });
        dialog.addBody('dashboard/dialog/prefabs/event/event_dialog', 'EventDialog');
    }

    handleMoreAction() {
        let state = this.dropDownOptions.active;
        this.dropDownOptions.active = !state;
    }

    /**
     * PRIVATES 
     */

    _onConfirmLogoutClick() {
        app.service.manuallyDisconnect();
    }

    // on high light message listener
    _onHLMListener() {
        if (!this.intervalTimer) {
            this.intervalTimer = new TimerRub(this._onRunningHLM.bind(this), this.interval);
        }
    }

    _onRunningHLM() {
        let hlm = app.system.hlm.getMessage();

        /**
         * hlm -> pause interval -> display message -> resume -> hlm
         */
        if (hlm && this.highLightNode && this.intervalTimer) {
            // pause timer
            this.intervalTimer.pause();

            // show hight light
            let txt = this.highLightNode.getComponent(cc.RichText) || this.highLightNode.getComponent(cc.label);
            // update text
            txt.string = hlm.msg;

            let txtWidth = this.highLightNode.getContentSize().width;
            let montorWidth = cc.director.getWinSize().width;
            let nodePositionY = this.highLightNode.getPosition().y;

            let movingTime = (txtWidth + montorWidth / 2) / 85;
            let startPosition = cc.v2(this.highLightNode.getPosition());
            let endPosition = cc.v2(0 - txtWidth - montorWidth / 2, nodePositionY);


            let action = cc.moveTo(movingTime, endPosition);
            let repeatCount = hlm.rc;

            let rp = cc.repeat(cc.sequence(action, cc.callFunc(() => {
                this.highLightNode.setPosition(startPosition);
                repeatCount--;
                // if complete counting, resume timer interval
                repeatCount === 0 && this.intervalTimer.resume();
            })), Number(hlm.rc));

            this.highLightNode.runAction(rp);
        }
    }

    _addGlobalListener() {
        super._addGlobalListener();
        app.system.addListener(app.commands.HIGH_LIGHT_MESSAGE, this._onHLMListener, this);
    }

    _removeGlobalListener() {
        super._removeGlobalListener();
        app.system.removeListener(app.commands.HIGH_LIGHT_MESSAGE, this._onHLMListener, this);
    }

    _onFeedbackConfirmed(content) {
        //collect user feedback and send to server
        if (content && content.trim().length > 0) {
            var sendObject = {
                'cmd': app.commands.SEND_FEEDBACK,
                'data': {
                    [app.keywords.REQUEST_FEEDBACK]: content
                }
            };

            app.service.send(sendObject, (data) => {
                if (data && data["s"]) {
                    app.system.showToast(app.res.string('feedback_sent_successfully'));
                } else {
                    app.system.showToast(app.res.string('error_while_sending_feedback'));
                }

            }, app.const.scene.DASHBOARD_SCENE);
        }

        this._hideDropDownMenu()
    }
}

app.createComponent(TopBar);