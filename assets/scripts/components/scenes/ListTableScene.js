import app from 'app';
import BaseScene from 'BaseScene';
import SFS2X from 'SFS2X';
import { requestTimeout, clearRequestTimeout } from 'TimeHacker';
import ScrollMessagePopup from 'ScrollMessagePopup';
import BuddyPopup from 'BuddyPopup';

export default class ListTableScene extends BaseScene {
    constructor() {
        super();

        this.contentInScroll = {
            default: null,
            type: cc.Node
        };

        this.tableListCell = {
            default: null,
            type: cc.Prefab
        };

        this.gameTitleLbl = {
            default: null,
            type: cc.Label
        };

        this.items = [];
        this.time = 2500 * 10; // creating new request for updating tables every 25s
        // filter button conditional 
        this.filterCond = null;
        // invitation popup showed
        this.invitationShowed = false;
        // timeout setTimeout
        this.timeout = null;
        this.gameCode = null;
        this.enableMinbets = null;
        this._isInitedRoomList = false;
        this.__isCreatingRoom = false;
        this.minBalanceMultiple = 0;

    }

    onLoad() {
        super.onLoad();
        this.filterCond = app.config.listTableGroupFilters[0];
        this.enableMinbets = [];
    }

    onEnable() {
        super.onEnable();
        this.gameCode = app.context.getSelectedGame();
        this.gameTitleLbl.string = this.gameCode ? app.const.gameLabels[this.gameCode].toUpperCase() : "";
    }

    start() {
        super.start();
        this._getFirstGameLobbyFromServer()
        this._getListGameMinBet()
    }

    onDestroy() {
        super.onDestroy();
        this._clearInterval();

        this.items.length = 0;
        // filter button conditional
        this.filterCond = null;
        // invitation popup showed
        this.invitationShowed = false;
    }

    _addGlobalListener() {
        super._addGlobalListener();
        app.system.addListener(app.commands.GET_LIST_GAME_MINBET, this._onListGameMinBetResponse, this);
        app.system.addListener(app.commands.USER_LIST_GROUP, this._onUserListGroup, this);
        app.system.addListener(app.commands.USER_LIST_ROOM, this._onUserListRoom, this);
        app.system.addListener(app.commands.USER_CREATE_ROOM, this._onUserCreateRoom, this);
        app.system.addListener(SFS2X.SFSEvent.ROOM_JOIN, this._handleRoomJoinEvent, this);
        app.system.addListener(app.commands.PLAYER_INVITE, this._onPlayerInviteEvent, this);
        app.system.addListener(SFS2X.SFSEvent.ROOM_JOIN_ERROR, this._onJoinRoomError, this);
    }

    _removeGlobalListener() {
        super._removeGlobalListener();
        app.system.removeListener(app.commands.GET_LIST_GAME_MINBET, this._onListGameMinBetResponse, this);
        app.system.removeListener(app.commands.USER_LIST_GROUP, this._onUserListGroup, this);
        app.system.removeListener(app.commands.USER_LIST_ROOM, this._onUserListRoom, this);
        app.system.removeListener(app.commands.USER_CREATE_ROOM, this._onUserCreateRoom, this);
        app.system.removeListener(SFS2X.SFSEvent.ROOM_JOIN, this._handleRoomJoinEvent, this);
        app.system.removeListener(app.commands.PLAYER_INVITE, this._onPlayerInviteEvent, this);
        app.system.removeListener(SFS2X.SFSEvent.ROOM_JOIN_ERROR, this._onJoinRoomError, this);
    }

    onClickChatBtn() {
        new BuddyPopup().show(this.node.parent, {focusTabIndex: BuddyPopup.TAB_CHAT_INDEX});
    }

    onClickBackBtn() {
        app.system.loadScene(app.const.scene.DASHBOARD_SCENE);
    }

    _getListGameMinBet(){
        let gameCode = app.context.getSelectedGame();
        this.gameCode && app.service.send({cmd: app.commands.GET_LIST_GAME_MINBET, data: {[app.keywords.GAME_CODE] : gameCode}})
    }

    onClickQuickJoinBtn() {
        let data = {};
        data[app.keywords.GAME_CODE] = this.gameCode;
        data[app.keywords.IS_SPECTATOR] = false;
        data[app.keywords.QUICK_JOIN_BET] = 1;

        app.system.showLoader();
        app.service.send({ cmd: app.commands.USER_QUICK_JOIN_ROOM, data });
    }

    _calculateMinBalanceToJoinGame(minBet) {
        return minBet * (this.minBalanceMultiple > 0 ? this.minBalanceMultiple : app.config.defaultMinBalanceJoinGameRoomMultiple);
    }

    onUserRequestJoinRoom({id, minBet, password, isSpectator, roomCapacity} = {}) {

        console.log('id: ', id, " minbet:", minBet, "Capacity: ", roomCapacity);

        let minBalance = this._calculateMinBalanceToJoinGame(minBet);

        if (minBalance > app.context.getMeBalance()) {
            app.system.error(
                app.res.string('error_user_not_enough_gold_to_join_room', {minBalance, currencyName: app.res.string('currency_name')})
            );
        } else {
            if (password) {
                app.system.info(app.res.string('error_system_not_support_join_room_have_password'));
            } else {
                if(id > 0){
                    this._requestJoinRoom({id, minBet, password, isSpectator});
                }else{
                    this._createRoom({minBet, roomCapacity})
                }
            }
        }
    }

    _onListGameMinBetResponse(data){
        if(data){
            this.enableMinbets = data[app.keywords.GAME_ENABLE_MINBET_LIST] || [];
            this.enableMinbets.sort((a, b) => a - b);

            if(this._isInitedRoomList){
                this._initRoomsListFromData({}, true)
            }
        }
    }

    onClickNongDanBtn() {
        this.filterCond = app.config.listTableGroupFilters[0];
        this._renderList();
    }

    onClickQuyTocBtn() {
        this.filterCond = app.config.listTableGroupFilters[1];
        this._renderList();
    }

    onClickHoangGiaBtn() {
        this.filterCond = app.config.listTableGroupFilters[2];
        this._renderList();
    }

    onClickGuideBtn() {
        let data = {
            [app.keywords.SERVICE_ID]: this.gameCode,
            [app.keywords.CLIENT_VERSION]: 1,
            [app.keywords.ACTION]: 1,
            "testMode": false
        };

        ScrollMessagePopup.show(this.node, {
            cmd: app.commands.RULE_OF_GAME,
            data: data,
            parser: (data) => {
                return data[app.keywords.GAME_RULE] ? data[app.keywords.GAME_RULE] : data[app.keywords.GAME_GUIDE];
            }
        });
    }

    // clear interval
    _clearInterval() {
        this.timeout && clearRequestTimeout(this.timeout);
    }

    _getFirstGameLobbyFromServer() {
        this.showLoading(app.res.string('loading_data'));
        app.service.send({
            cmd: app.commands.USER_LIST_GROUP,
            data: {[app.keywords.SERVICE_ID]: this.gameCode}
        });
    }

    _onUserListGroup(data) {
        if (data && data[app.keywords.GAME_LIST_RESULT] && data[app.keywords.GAME_LIST_RESULT] === this.gameCode) {
            let roomIds = data[app.keywords.GROUP_LIST_GROUP][app.keywords.GROUP_SHORT_NAME];
            let minBalanceMultiples = data[app.keywords.GROUP_LIST_ROLE]["minBalanceMultiples"];

            if(minBalanceMultiples && minBalanceMultiples.length > 0){
                this.minBalanceMultiple = minBalanceMultiples[0];
            }

            if(roomIds && roomIds.length > 0){
                this._sendRequestUserJoinLobbyRoom(roomIds[0]);
            }
        }
    }

    _sendRequestUserJoinLobbyRoom(lobbyId) {
        if (!lobbyId) {
            app.system.info(app.res.string('error_undefined_please_try_again'));
        }else{
            app.service.send({
                cmd: app.commands.USER_JOIN_LOBBY_ROOM,
                data: {
                    [app.keywords.GROUP_ID]: `${this.gameCode}${lobbyId}`
                }
            });
        }
    }

    _onPlayerInviteEvent(event) {
        if (!this.invitationShowed && !this.__isCreatingRoom) {
            let joinRoomRequestData = {
                id: event[app.keywords.INVITATION_ROOM_SFSID],
                isSpectator: false,
                minBet: event[app.keywords.QUICK_JOIN_BET]
            };
            this.invitationShowed = true;

            this.invitationShowed && app.system.confirm(
                app.res.string('user_got_invitation_to_join_room', { invoker: event.u, minBet: event.b }),
                this._onCancelInvitationBtnClick.bind(this),
                this._onConfirmInvitationBtnClick.bind(this, joinRoomRequestData)
            );
        }
    }

    _onConfirmInvitationBtnClick(joinRoomRequestData) {
        this.invitationShowed = false;

        this._requestJoinRoom(joinRoomRequestData);
    }

    _onCancelInvitationBtnClick() {
        this.invitationShowed = false;
    }

    _handleRoomJoinEvent(event) {
        let room = event.room;
        if (room) {
            if (room.isGame === false && room.name && room.name.indexOf('lobby') > -1) {
                this._sendRequestUserListRoom(room);
            }
        } else {
            if (event.errorCode) {
                this.hideLoading()
                app.system.error(app.getMessageFromServer(event));
            }
        }
    }

    _sendRequestUserListRoom(room) {
        app.service.send({
            cmd: app.commands.USER_LIST_ROOM,
            room
        });

        if (!this.timeout) {
            this.timeout = requestTimeout(() => {
                this.timeout && this._sendRequestUserListRoom(room);
                clearRequestTimeout(this.timeout);
            }, this.time);
        }
    }

    _onUserListRoom(data) {
        this._initRoomsListFromData(data);
        /*Need to check exactly equal true or undefined*/
        if(app.context.requestRandomInvite === true || app.context.requestRandomInvite === undefined){
            setTimeout(() => this.node && app.service.send({cmd: "randomInviteGame", data: {[app.keywords.GAME_CODE] : this.gameCode}}), 800);
        }
    }

    _initRoomsListFromData(data = {}, addMore = false) {

        let ids = data[app.keywords.ID] || []
        let displayIds = data[app.keywords.ROOM_CUSTOM_ID] || []
        let minBets = data[app.keywords.ROOM_MIN_BET] || []
        let passwords = data[app.keywords.ROOM_PASSWORD] || []
        let userCounts = data[app.keywords.ROOM_USER_COUNT] || []
        let roomCapacitys = data[app.keywords.ROOM_USER_MAX] || []

        // room faker
        this.enableMinbets.forEach(minBet => {
            ids.push(0);
            displayIds.push(0);
            minBets.push(minBet);
            passwords.push(null);
            userCounts.push(0);
            roomCapacitys.push(app.const.game.maxPlayers[this.gameCode || 'default']);
        })

        if(!addMore){
            this.items.forEach(item => item.node && item.node.destroy() && item.node.removeComponent(true))
            this.items.length = 0;
        }

        for (let i = 0; i < displayIds.length; i++) {
            let listCell = cc.instantiate(this.tableListCell);
            let cellComponent = listCell.getComponent('TableListCell');
            cellComponent.setOnClickListener((data) => this.onUserRequestJoinRoom(data));
            cellComponent && cellComponent.initCell({
                id: ids[i],
                displayId: displayIds[i],
                minBet: minBets[i],
                userCount: userCounts[i],
                roomCapacity: roomCapacitys[i],
                password: passwords[i]
            });

            this.items.push(cellComponent);
        }

        this._renderList();
        this._isInitedRoomList = true;
    }

    /**
     * 
     * @param {function} cond: _filter condition
     * 
     * @memberOf ListTableScene
     */
    _renderList() {

        if (this.contentInScroll) {
            this.contentInScroll.removeAllChildren();
        }

        let filterItems = this._filterItems();
        if(filterItems.length > 0){
            this.setVisibleEmptyNode(false);
            filterItems.map(item => this.contentInScroll.addChild(item.node))
        }else{
            this.setVisibleEmptyNode(true);
        }

        this.hideLoading();
    }

    /**
     * 
     * @param {any} cond
     * {
     *      max: number,
     *      min: number
     * }
     * @memberOf ListTableScene
     */
    _filterItems() {
        return this.items.filter(item => {
            let minbet = item.getComponentData().minBet;
            return minbet >= this.filterCond.min && minbet <= this.filterCond.max
        });
    }

    /**
     * 
     * @param {any} cell {id, isSpectator, minBet, password}
     * 
     * @memberOf ListTableScene
     */
    _requestJoinRoom({id, minBet, password, isSpectator} = {}) {
        let data = {};
        data[app.keywords.ROOM_ID] = id;
        data[app.keywords.IS_SPECTATOR] = isSpectator || false;
        data[app.keywords.ROOM_BET] = minBet;
        password && (data[app.keywords.ROOM_PASSWORD] = password);

        this.showLoading('Đang vào bàn chơi....');
        app.service.send({cmd: app.commands.USER_JOIN_ROOM, data: data});
    }


    _createRoom({minBet = 0, roomCapacity = 2} = {}) {

        this.__isCreatingRoom = true;

        /**
         * If create room successfully, response going handle by join room success follow
         */
        this.showLoading('Đang vào bàn chơi....');
        app.service.send({
            cmd: app.commands.USER_CREATE_ROOM,
            data: {
                [app.keywords.ROOM_BET]: minBet,
                [app.keywords.GAME_CODE]: this.gameCode,
                [app.keywords.ROOM_CAPACITY]: roomCapacity,
                [app.keywords.IS_SPECTATOR]: false
            }
        });

        console.log('data: ', data);
    }

    _onUserCreateRoom(data) {
        this.__isCreatingRoom = false;
        if (data.errorCode) {
            this.hideLoading()
            app.system.error(app.getMessageFromServer(data));
        }
    }

    _onJoinRoomError() {
        this.__isCreatingRoom = false;
        this._clearInterval();
        this._sendRequestUserListRoom();
    }
}

app.createComponent(ListTableScene);