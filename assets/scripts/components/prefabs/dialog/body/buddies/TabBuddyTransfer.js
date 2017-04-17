/**
 * Created by Thanh on 1/25/2017.
 */
import app from 'app';
import PopupTabBody from 'PopupTabBody';
import {isNumber, active, deactive, numberFormat} from 'Utils';
import CCUtils from 'CCUtils';

export default class TabBuddiesTransfer extends PopupTabBody {

    constructor() {
        super();

        this.properties = {
            ...this.properties,
            formTransferNode: cc.Node,
            receiverEditBoxNode: cc.EditBox,
            transferAmountEditBoxNode: cc.EditBox,
            transferReasonEditBoxNode: cc.EditBox,
            feeAmountLbl: cc.Label,
            maxAmountLbl: cc.Label,
            minAmountLbl: cc.Label,
            warningLbl: cc.Label,
            maxLblNode: cc.Node,
            mainNode: cc.Node,
            loadingNode: cc.Node
        };

        this.receiverBuddyName = null;
    }

    start() {
        super.start();

        this._sendRequest();
    }
    
    renderComponentData(data) {
        if(!data)
            return;
        let {minTransfer, maxTransfer, feeTransfer} = data;
        
        if(this.receiverEditBoxNode.string == "") {
            this.receiverEditBoxNode.string = this.receiverBuddyName || '';
        }

        this.feeAmountLbl.string = `${numberFormat(feeTransfer)}%`;
        this.minAmountLbl.string = numberFormat(minTransfer);
        this.maxAmountLbl.string = numberFormat(maxTransfer);
    }
    
    setReceiverName(name) {
        console.debug('name', name);
        this.receiverEditBoxNode.string = name;
    }
    
    onTransferMoneyBtnClick() {
        let data = this.getComponentData();

        let receiver = this.receiverEditBoxNode.string;

        if (!receiver) {
            app.system.showToast(app.res.string('error_user_enter_empty_input'));
            return;
        }

        let money = Number(this.transferAmountEditBoxNode.string);
        if (!isNumber(money)) {
            app.system.showToast(app.res.string('error_transfer_input_is_invalid', {type: 'chuyển'}));
            return;
        }

        if (money < data.minTransfer) {
            app.system.showToast(app.res.string('error_transfer_input_is_too_small', {type: "chuyển", min: numberFormat(data.minTransfer)}));
            return;
        }

        if (app.context.getMeBalance() < (data.minTransfer + data.feeTransfer)) {
            app.system.showToast(app.res.string('error_transfer_input_is_not_enough', {amount: numberFormat(data.minTransfer + data.feeTransfer)}));
            return;
        }

        if (money > data.maxTransfer) {
            app.system.showToast(app.res.string('error_transfer_input_is_over_max', {
                type: 'chuyển',
                max: numberFormat(data.maxTransfer)
            }));
            return;
        }

        let reason = this.transferReasonEditBoxNode.string;
        app.service.send({
            cmd: app.commands.USER_TRANSFER_TO_USER,
            data: {
                [app.keywords.USERNAME]: receiver,
                [app.keywords.GOLD]: money,
                [app.keywords.TRANSFER_REASON]: reason
            }
        });
    }

    _addGlobalListener() {
        super._addGlobalListener();
        app.system.addListener(app.commands.USER_TRANSFER_CONFIG, this._onGetTransferInfo, this);
        app.system.addListener(app.commands.USER_TRANSFER_TO_USER, this._onUserTransferResponse, this);
    }

    _removeGlobalListener() {
        super._removeGlobalListener();
        app.system.removeListener(app.commands.USER_TRANSFER_CONFIG, this._onGetTransferInfo, this);
        app.system.removeListener(app.commands.USER_TRANSFER_TO_USER, this._onUserTransferResponse, this);
    }

    setReceiverBuddyName(name) {
        this.receiverBuddyName = name;
    }

    setOnClickBackButtonListener(listener) {
        this.onBackListener = listener;
    }

    onClickBackButton() {
        this.onBackListener && this.onBackListener();
    }

    showLoading(){
        CCUtils.setVisible(this.loadingNode, true)
        CCUtils.setVisible(this.mainNode, false)
    }

    hideLoading(){
        CCUtils.setVisible(this.loadingNode, false)
        CCUtils.setVisible(this.mainNode, true)
    }

    _sendRequest() {
        this.showLoading()
        app.service.send({cmd: app.commands.USER_TRANSFER_CONFIG});
    }

    setComponentData(data){
        this.hideLoading()
        super.setComponentData(data)
    }

    _onGetTransferInfo(data) {
        let currentMoney = app.context.getMeBalance();
        this.setComponentData({
            feeTransfer: data["feeTransfer"] || 0,
            minTransfer: data["minTransfer"] || 0,
            maxTransfer: data["maxTransfer"] ? Math.min(currentMoney, data["maxTransfer"]) : currentMoney
        })

        this.renderComponentData(this.getComponentData())

        // active(this.warningLbl);
        // this.warningLbl.string = app.res.string('error_long_is_ineligible');
    }

    _onUserTransferResponse(data) {
        let su = data[app.keywords.RESPONSE_RESULT];
        if (su) {
            let username = this.receiverEditBoxNode.string;
            let amount = numberFormat(this.transferAmountEditBoxNode.string);
            app.system.showToast(app.res.string('transfer_successfully', {amount, username}));
        } else {
            let msg = data[app.keywords.RESPONSE_MESSAGE];
            app.system.showToast(msg || app.res.string('error_unknow'));
        }
    }
}

app.createComponent(TabBuddiesTransfer);