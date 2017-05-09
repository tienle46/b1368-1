import app from 'app';
import PopupTabBody from 'PopupTabBody';
import {
    isEmpty,
    numberFormat
} from 'Utils';
import RubUtils from 'RubUtils';
import CCUtils from 'CCUtils';

class TabCard extends PopupTabBody {
    constructor() {
        super();

        this.properties = {
            ...this.properties,
            activeStateSprite: cc.Sprite,
            inActiveStateSprite: cc.Sprite,
            providerItemNode: cc.Node,
            providerContainerNode: cc.Node,
            providerTitleLbl: cc.Label,
            cardLayoutPanel: cc.Node,
            ratioPanel: cc.Node,
            ratioItemContainer: cc.Node,
            ratioItem: cc.Node,
            ratioItemTitleLbl: cc.Label,
            ratioPromote: cc.Node,
            ratioPromoteLbl: cc.Label,
            ratioItemXuLbl: cc.Label,
            cardSerialEditBox: cc.EditBox,
            serialNumberEditBox: cc.EditBox
        };

        this.providerId = null;
    }

    onLoad() {
        super.onLoad();
        CCUtils.deactive(this.cardLayoutPanel);
        // wait til every requests is done
        // this._initRatioGroup();
        
        app.system.marker.log();
    }
    
    loadData() {
        if(this.loadedData)
            return false;
        super.loadData();
        
        this.showLoadingProgress();

        if(!app.context.ctl)
            // init request
            app.system.marker.initRequest(app.system.marker.TOPUP_DIALOG_CACHE_TAB_CARD, this._initCardsGroup.bind(this), this._renderForm.bind(this))
        else
            this._onUserGetChargeList(app.context.ctl, true)
        
        return true;
    }
    
    // onDataChanged(data) {
    //     console.debug(data, this._data, !app._.isEqual(data, this._data))
    //     if(data && !app._.isEqual(data, this._data))
    //         Object.keys(data).length > 0 && this._renderForm(data);
    // }
   
    _addGlobalListener() {
        super._addGlobalListener();
        app.system.addListener(app.commands.USER_GET_CHARGE_LIST, this._onUserGetChargeList, this);
    }

    _removeGlobalListener() {
        super._removeGlobalListener();
        app.system.removeListener(app.commands.USER_GET_CHARGE_LIST, this._onUserGetChargeList, this);
    }

    _initCardsGroup() {
        let sendObject = {
            'cmd': app.commands.USER_GET_CHARGE_LIST,
        };
                
        app.service.send(sendObject);
    }

    _onUserGetChargeList(data, hasCtl = false) {
        // request Cache.
        let renderData = {
            [app.keywords.EXCHANGE_LIST.RESPONSE.ITEM_ID_LIST]: data[app.keywords.EXCHANGE_LIST.RESPONSE.ITEM_ID_LIST] || [],
            [app.keywords.TASK_NAME_LIST]: data[app.keywords.TASK_NAME_LIST] || [],
            [app.keywords.CARDS]: data[app.keywords.CARDS] || {}
        };
        
        this.loadedData = true;
        
        hasCtl ? this._renderForm(renderData) : app.system.marker.renderRequest(app.system.marker.TOPUP_DIALOG_CACHE_TAB_CARD, renderData, this._renderForm.bind(this));
    }
    
    onProviderBtnClick(toggle) {
        this.providerTitleLbl.string = toggle.providerName.toUpperCase();
        this.providerId = toggle.providerId;
    }
    
    onHanleChargeBtnClick() {
        let cardSerial = this.cardSerialEditBox.string.trim();
        let serialNumber = this.serialNumberEditBox.string.trim();

        if (isEmpty(cardSerial) || isEmpty(serialNumber) || isNaN(cardSerial) || isNaN(serialNumber)) {
            app.system.error(
                app.res.string('error_user_enter_empty_input')
            );
        } else {
            let sendObject = {
                'cmd': app.commands.USER_SEND_CARD_CHARGE,
                data: {
                    [app.keywords.CHARGE_CARD_PROVIDER_ID]:this.providerId,
                    [app.keywords.CARD_CODE]:cardSerial,
                    [app.keywords.CARD_SERIAL]:serialNumber
                }
            };

            app.service.send(sendObject); // send request and get `smsg` (system_message) response from server
        }
    }
    
    onRatioBtnClick() {
        this._showRatioBtn();
    }
    
    onBackBtnClick() {
        this._showFormPanel();
    }
    
    _showRatioBtn() {
        CCUtils.deactive(this.cardLayoutPanel);
        CCUtils.active(this.ratioPanel);
    }
    
    _showFormPanel() {
        CCUtils.active(this.cardLayoutPanel);
        CCUtils.deactive(this.ratioPanel);
    }
    
    _renderForm(data) {
        this.hideLoadingProgress();
        
        let cardListIds = data[app.keywords.EXCHANGE_LIST.RESPONSE.ITEM_ID_LIST] || [];
        
        if (cardListIds.length > 0) {
            CCUtils.destroyAllChildren(this.providerContainerNode, 0);       
            
            cardListIds.forEach((id, index) => {
                let providerName = data[app.keywords.TASK_NAME_LIST][index];
                let activeState = `${providerName.toLowerCase()}-active`;
                let inactiveState = `${providerName.toLowerCase()}-inactive`;
                
                RubUtils.getSpriteFramesFromAtlas(app.res.ATLAS_URLS.PROVIDERS, [activeState, inactiveState], (sprites) => {
                    this.activeStateSprite.spriteFrame = sprites[activeState];
                    this.inActiveStateSprite.spriteFrame = sprites[inactiveState];

                    let provider = cc.instantiate(this.providerItemNode);
                    this.addNode(provider);
                    provider.active = true;

                    let toggle = provider.getComponent(cc.Toggle);
                    toggle.isChecked = index == 0;
                    toggle.providerName = providerName;
                    toggle.providerId = id;

                    this.providerContainerNode.addChild(provider);

                    if (toggle.isChecked) {
                        // toggle.check();
                        this.onProviderBtnClick(toggle);
                    }

                    if(index === cardListIds.length - 1) {
                        this._showFormPanel();
                    }
                });
            });
            
            // ratio
            let cardRatios = data['cards'] ? data['cards']['rates'] : [];
            
            cardRatios.forEach(card => {
                let {amount, balance, rate, promoteDesc} = card;
                
                this.ratioItemTitleLbl.string = `${numberFormat(amount)} VNĐ`;
                this.ratioItemXuLbl.string = `${numberFormat(balance)} ${app.config.currencyName}`;
                
                if(rate > 1) {
                    CCUtils.active(this.ratioPromote) 
                    this.ratioPromoteLbl = promoteDesc;
                    this.ratioItemXuLbl.node.color = new cc.Color(255, 204, 0);
                } else {
                    CCUtils.deactive(this.ratioPromote);
                    this.ratioItemXuLbl.node.color = app.const.COLOR_WHITE;
                }
                
                let itemNode = cc.instantiate(this.ratioItem);
                itemNode.active = true;
                
                this.ratioItemContainer.addChild(itemNode);
            });
        } 
    }
}

app.createComponent(TabCard);