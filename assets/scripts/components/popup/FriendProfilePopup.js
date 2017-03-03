import app from 'app';
import utils from 'utils';
import DialogActor from 'DialogActor';
import NodeRub from 'NodeRub';
import Props from 'Props';
import numeral from 'numeral';
import CCUtils from 'CCUtils';

export default class FriendProfilePopup extends DialogActor {
    constructor() {
        super();

        this.properties = {
            ...this.properties,
            propsGridView: cc.Layout,
            rtUserName: cc.Label,
            rtBalance: cc.Label,
            bgNode: cc.Node,
            leftBtn: cc.Button,
            rightBtn: cc.Button,
            kickBtn: cc.Button,
            addFriendBtn: cc.Button
        };

        // paging
        this.itemsPerPage = 18;
        this.currentPage = 1;

        this.totalPage = null;
        this.totalItems = null;

        this.friendId = null;
        this.isOwner = null;
        this.kickable = null;
        this.friendName = null;
    }

    onLoad() {
        super.onLoad();

        this._initTouchEvent();

        this._initNodeEvents();

        this.loadPropsAssets();
    }

    onEnable() {
        super.onEnable();

        utils.setInteractable(this.addFriendBtn, !(this.friendName && app.buddyManager.containsBuddy(this.friendName)));
    }

    start() {
        super.start();
    }

    displayUserDetail(userName, userId, isOwner) {
        this.friendName = userName;
        this.friendId = userId;

        this.kickable = app.context.getLastJoinedRoom().variables.kickable.value;
        this.kickBtn.node.active = this.kickable && isOwner;

        var sendObject = {
            'cmd': app.commands.SELECT_PROFILE,
            'data': {
                [app.keywords.USER_NAME]: userName
            }
        };

        app.service.send(sendObject);
    }

    performAnimation(prosName, startNode, destinationNode) {
        this.node.opacity = 0;

        Props.playProp(prosName, { startPos: CCUtils.getWorldPosition(startNode), endPos: CCUtils.getWorldPosition(destinationNode) }, () => {
            CCUtils.destroy(this.node);
        });
    }

    setCallbackOptions(startAnimNode, endAnimNode) {
        this.startAnimNode = startAnimNode;
        this.endAnimNode = endAnimNode;
    }

    loadPropsAssets() {
        let assets = Object.values(app.res.asset_tools);
        this.totalItems = assets.length;
        this.totalPage = Math.ceil(this.totalItems / this.itemsPerPage);
        assets.map(asset => {
            const clickEvent = new cc.Component.EventHandler();
            clickEvent.target = this.node;
            clickEvent.component = 'FriendProfilePopup';
            clickEvent.handler = 'propsItemClicked';

            let o = {
                name: asset.name,
                sprite: {
                    spriteFrame: asset.spriteFrame,
                    trim: false,
                    type: cc.Sprite.Type.SIMPLE,
                    sizeMode: cc.Sprite.SizeMode.SIMPLE
                },
                button: {
                    event: clickEvent
                }
            };

            const node = NodeRub.createNodeByOptions(o);

            this.propsGridView && this.propsGridView.node.addChild(node);
        })
    }

    propsItemClicked(e) {
        const prosName = e.target.name;
        let itemId = app.res.asset_tools[prosName].id,
            ev = new cc.Event.EventCustom('on.asset.picked', true);

        let sendObject = {
            cmd: app.commands.ASSETS_USE_ITEM,
            data: {
                [app.keywords.ASSETS_DAOCU_ITEM_USED_ID]: itemId,
                [app.keywords.STORE_TYPE]: 3,
                [app.keywords.ASSETS_ITEM_USED_RECEIVER]: this.friendName
            }
        };

        app.service.send(sendObject);

        CCUtils.destroy(this.node);
    }

    onLeftBtnClick(e) {
        e.stopPropagation();
        let cp = this.currentPage;
        if (--cp < 1) {
            this.currentPage = 1;
            return;
        }
        this.currentPage = cp;
        this._runPropsGridViewAction(true);
    }

    onRightBtnClick(e) {
        e.stopPropagation();
        let cp = this.currentPage;
        if (++cp > this.totalPage) {
            this.currentPage = this.totalPage;
            return;
        }
        this.currentPage = cp;
        this._runPropsGridViewAction(false);
    }


    kickUser() {
        if (!this.kickable) {
            app.system.showToast(app.res.string('error_function_does_not_support'));
        } else {
            if (this.friendId) {
                this._onKickUser(this.friendId);
            }
        }
    }

    inviteFriend() {
        app.buddyManager.requestAddBuddy(this.friendName);
    }

    close() {
        CCUtils.destroy(this.node);
    }

    _addGlobalListener() {
        super._addGlobalListener();
        app.system.addListener(app.commands.SELECT_PROFILE, this._onSelectUserProfile, this);
        app.system.addListener(app.commands.BUDDY_INVITE_FRIEND, this._onBuddyInviateFriend, this);
    }

    _removeGlobalListener() {
        super._removeGlobalListener();
        app.system.removeListener(app.commands.SELECT_PROFILE, this._onSelectUserProfile, this);
        app.system.removeListener(app.commands.BUDDY_INVITE_FRIEND, this._onBuddyInviateFriend, this);
    }

    _onKickUser(id) {
        //kick user khoi ban choi
        var sendObject = {
            'cmd': app.commands.PLAYER_KICK,
            data: {
                [app.keywords.USER_ID]: id
            },
            room: app.context.getLastJoinedRoom()
        };

        app.service.send(sendObject);
    }

    _changePaginationState() {
        this.leftBtn.node.active = !(this.currentPage === 1);
        this.rightBtn.node.active = !(this.totalPage && this.currentPage === this.totalPage);
    }

    _initNodeEvents() {
        this.node.on('change-paging-state', this._changePaginationState.bind(this));
    }

    _initTouchEvent() {
        let dialog = this.node.getChildByName('popup_bkg');
        dialog.zIndex = app.const.topupZIndex;

        dialog.on(cc.Node.EventType.TOUCH_START, () => {
            return true;
        });

        this.node.on(cc.Node.EventType.TOUCH_START, () => {
            return true;
        });

        this.bgNode.on(cc.Node.EventType.TOUCH_START, (e) => {
            e.stopPropagationImmediate();
            this.close();
            return true;
        });
    }

    _onSelectUserProfile(user) {
        this.rtUserName.string = `${user["u"]}`;
        this.rtBalance.string = `${numeral(user["coin"]).format('0,0') || 0}`;
    }

    _runPropsGridViewAction(isLeft = true) {
        let width = this.propsGridView.node.parent.getContentSize().width;
        let action = cc.moveBy(0.1, cc.v2(isLeft ? width : -width, 0));
        this.propsGridView.node.runAction(action);
        this.node.emit('change-paging-state');
    }

    _onBuddyInviateFriend(data) {
        app.system.showToast(`Đã gửi lời mời kết bạn tới ${data[app.keywords.BUDDY_NAME]}`);
    }
}

app.createComponent(FriendProfilePopup);