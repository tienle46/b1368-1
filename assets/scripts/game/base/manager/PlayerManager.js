/**
 * Created by Thanh on 8/23/2016.
 */

import app from 'app'
import utils from 'utils'
import Player from 'Player'
import SFS2X from 'SFS2X'
import Component from 'Component'
import CreateGameException from 'CreateGameException'

export default class PlayerManager extends Component {
    constructor() {
        super();

        this.playerPositions = {
            default: null,
            type: cc.Node
        }

        this.me = null
        this.owner = null
        this.board = null
        this.parentScene = null
        this.players = null
        this.maxPlayerId = 1
        this._playerPrefab = null
        this._idToPlayerMap = null
        this._nameToPlayerMap = null

    }

    isItMe(id){
        return this.me.id == id;
    }

    _init(board, scene) {
        this.board = board;
        this.parentScene = scene;
        this.gameCode = (this.board && this.board.gameCode) || (app.config.test ? "tnd" : "")
        this._reset();

        this._initPlayerLayer();
    }

    _onFinishInitPlayerLayer(){
        cc.loader.loadRes('game/players/Player', (error, prefab) => {
            if(error){
                throw new CreateGameException("Không thể khởi tạo người chơi")
                return;
            }

            this._playerPrefab = prefab;
            this.initPlayers()
        });
    }

    _initPlayerLayer() {
        let maxPlayer = app.game.getMaxPlayer(this.gameCode);
        let positionAnchorResPath = maxPlayer && app.res.playerAnchorPath[maxPlayer];
        let positionAnchorName = maxPlayer && app.res.playerAnchorName[maxPlayer];

        if (positionAnchorResPath && positionAnchorName) {
            cc.loader.loadRes(positionAnchorResPath, (error, prefab) => {

                if(!error){
                    let prefabObj = cc.instantiate(prefab);
                    prefabObj.parent = this.parentScene.playerLayer
                    this.playerPositions = prefabObj.getComponent(positionAnchorName);
                }

                if(!this.playerPositions){
                    error = {}
                }

                if(error){
                    throw new CreateGameException("Không thể cài đặt vị trí người chơi")
                }else{
                    this._onFinishInitPlayerLayer();
                }
            })
        } else {
            throw new CreateGameException("Không tìm thấy cài đặt số người chơi tương ứng với game")
        }
    }

    _reset() {
        this.me = null;
        this.players = [];
        this._idToPlayerMap = {};
        this._nameToPlayerMap = {};
        this.maxPlayerId = 1
    }

    initPlayers() {
        let users = this.board.room.getPlayerList()
        users && users.forEach(user => {
            user.isPlayer() && this._createSinglePlayer(user);
        });

        if(app.config.test && !users || users.length == 0){
            cc.loader.loadRes('game/players/Player', (error, prefab) => {
                let prefabObj = cc.instantiate(prefab);
                this._setPlayerPosition(prefabObj, 1)
                prefabObj.parent = this.parentScene.playerLayer

                prefabObj = cc.instantiate(prefab);
                this._setPlayerPosition(prefabObj, 2)
                prefabObj.parent = this.parentScene.playerLayer

                prefabObj = cc.instantiate(prefab);
                this._setPlayerPosition(prefabObj, 3)
                prefabObj.parent = this.parentScene.playerLayer

                prefabObj = cc.instantiate(prefab);
                this._setPlayerPosition(prefabObj, 4)
                prefabObj.parent = this.parentScene.playerLayer
            });
        }

        console.log("initPlayers")

        this._onPlayerDataChanged();
    }

    _createSinglePlayer(user){

        let player;

        let playerNode = cc.instantiate(this._playerPrefab);
        let playerClass = app.game.getPlayerClass(this.gameCode);

        if(playerClass){
            let playerComponent = app.createComponent(playerClass, this.board, user);
            let player = playerNode.addComponent(playerComponent)

            if(player){
                this._setPlayerPosition(playerNode, player)
                this._addToPlayerLayer(playerNode)
                this._addPlayerToList(player)
            }
        }

        return player;
    }

    _addToPlayerLayer(playerNode){
        playerNode.parent = this.parentScene.playerLayer
    }

    _setPlayerPosition(playerNode, player){
        let anchor = this.playerPositions.getPlayerAnchorByPlayerId(player.id, player.isItMe())
        playerNode && anchor && playerNode.setPosition(anchor.getPosition())
    }

    /**
     * This function will be update all feature of player when data change
     *
     * @private
     */
    _onPlayerDataChanged() {

        if(!app.context.getMe()){
            return;
        }

        this.me = this.findPlayer(app.context.getMe().getPlayerId(this.board.room));

        var ownerId = utils.getVariable(this.board.room, app.keywords.VARIABLE_OWNER);

        console.log("owner: " + ownerId)

        if (ownerId && (!this.owner || ownerId === this.owner.id)) {

            this.owner && this.owner.setOwner(false)
            this.owner = this.findPlayer(ownerId)
            this.owner && this.owner.setOwner(true)

            console.log("owner player: " + this.owner)

            //TODO More action on owner changed
        } else {
            this.owner = null;
        }

        //TODO change board master

        let maxPlayerId = 1;
        this.players.forEach(player => {
            maxPlayerId = Math.max(maxPlayerId, player.id);

            //TODO more action want to apply to player

        })

        if(this.board.isNewBoard() || this.board.isReady()){
            this.playerPositions.showAllInviteButton();
        }else{
            this.playerPositions.hideInviteButton(1);
        }

        this.maxPlayerId = maxPlayerId;

    }

    _updateMaxPlayerId() {
        let maxPlayerId = 1;

        this.players.forEach(player => {
            maxPlayerId = Math.max(maxPlayerId, player.id);
        })

        this.maxPlayerId = maxPlayerId;
    }

    _addPlayerToList(player) {
        if(!player){
            return;
        }

        let playerIndex = this._findPlayerIndex(player.id)
        if (playerIndex < 0) {
            this.players.push(player);
        }else{
            this.players[playerIndex] = player;
        }

        this._idToPlayerMap[player.id] = player;
        this._nameToPlayerMap[player.user.name] = player;
    }

    isSpectator() {
        return (!this.me || (!this.me.isPlaying() && this.board.isPlaying()));
    }

    isMePlaying() {
        return !this.isSpectator() && this.me.isPlaying();
    }

    isShouldMeReady() {
        return this.Me && !this.me.isOwner() && !this.me.isReady();
    }

    findPlayer(idOrName) {
        if (utils.isNumber(idOrName)) {
            return this._idToPlayerMap[idOrName];
        } else {
            return this._nameToPlayerMap[idOrName];
        }
    }

    _findPlayerIndex(playerId) {
        let playerIndex = -1;
        this.players.some((value, index) => {
            if (value.id == playerId) {
                playerIndex = index;
                return true;
            }
        })
        return playerIndex;
    }

    _addPlayer(user) {
        let newPlayer = this._createSinglePlayer(user);
        // this._onPlayerDataChanged()
        return newPlayer;
    }

    _removePlayer(player) {
        this.players.some((value, i, arr) => {
            if (value.id == player.id) {

                this.players.splice(i, 1)
                delete this._idToPlayerMap[player.id]
                delete this._idToPlayerMap[player.user.name]

                this._onPlayerDataChanged()

                return true;
            }
        })
    }

    _replaceUser(player, newId) {

        let oldUser = player.user;
        if (oldUser == null) {
            return;
        }

        let userObj = [];
        userObj.push(newId);
        userObj.push(oldUser.name);
        userObj.push(oldUser.privilegeId);
        userObj.push(player.id);
        userObj.push(this.__getUserVariablesData(oldUser));

        let newUser = SFS2X.Entities.SFSUser.fromArray(userObj, this.board.room);
        newUser._setUserManager(app.service.client.userManager);

        this.board.room._removeUser(oldUser);

        app.service.client.userManager._removeUser(oldUser);
        app.service.client.userManager._addUser(newUser);

        this.board.room._addUser(newUser);
        player.setUser(newUser);
    }

    countPlayingPlayers() {
        var count = 0;
        this.players.forEach(player => {
            if ((this.board.isPlaying() || this.board.isStarting()) && player.isPlaying())
                count++;
        })

        return count;
    }

    getPlayerSeatId(playerId) {
        return this.board.positionManager.getPlayerSeatId(playerId);
    }

    getPlayerPosition(playerId) {
        return this.board.positionManager.getPlayerSeatPosition(playerId);
    }

    onBoardMinBetChanged() {
        this.players.forEach(player => {
            !player.isOwner() && player.resetReadyState()
        })
    }

    onBoardMasterChanged(master) {
        this.players.forEach(player => player.onBoardMasterChanged())
    }

    onBoardOwnerChanged(owner) {
        this.players.forEach(player => player.onBoardOwnerChanged())
    }

    playerOnBoardBegin(data) {
        this.players.forEach(player => player.onBoardBegin(data));
    }

    playerOnBoardStarting(data) {
        this.players.forEach(player => player.onBoardStarting(data));
    }

    playerOnBoardStarted(data) {
        this.players.forEach(player => player.onBoardStarted(data));
    }

    playerOnBoardPlaying(data) {
        this.players.forEach(player => player.onBoardPlaying(data));
    }

    playerOnBoardEnd(data) {
        this.players.forEach(player => player.onBoardEnd(data));
    }

    playerOnPlayerRejoin(playerIds, remainCardSizes, data) {
        playerIds && playerIds.forEach((id, i) => {
            var player = this.findPlayer(playerIds[i]);
            player.onRejoin(remainCardSizes[i], data);
        })
    }

    onPlayerToSpectator(user) {
        this.players.forEach(player => {
            player.onPlayerToSpectator(user);
        })
    }

    onSpectatorToPlayer(user) {
        this.players.forEach(player => {
            player.onSpectatorToPlayer(user);
        })
    }

    onPlayerLeaveBoard(playerOrIdOrName) {
        var leaveBoardPlayer = playerOrIdOrName instanceof Player ? playerOrIdOrName : this.findPlayer(playerOrIdOrName);

        if (leaveBoardPlayer) {
            if (leaveBoardPlayer.isItMe()) {
                leaveBoardPlayer.stopTimeLine();
            } else {
                if (leaveBoardPlayer.isMaster) {
                    this.board.setMaster(null);
                }

                this._removePlayer(leaveBoardPlayer);
            }
        }
    }

    _shouldLeaveBoardImmediately(player) {
        if (player && player.hasOwnProperty('isTurn') && typeof(player.isTurn) == "function") {
            return !(this.board.isPlaying() && player.isTurn());
        } else {
            return !(this.board.isPlaying());
        }

    }

    onUserEnterRoom(user, room) {
        if (user && user.isPlayer() && !this.findPlayer(user.getPlayerId(room))) {

            let newPlayer = this._addPlayer(user);

            if (newPlayer) {
                let boardState = this.board.isPlaying() || this.board.isStarting() ? app.const.game.board.state.PLAYING
                : this.board.isBegin() ? app.const.game.board.state.BEGIN
                : this.board.isReady() ? app.const.game.board.state.READY
                : this.board.isEnding() ? app.const.game.board.state.ENDING
                : undefined;

                boardState && newPlayer.applyBoardState(boardState);
            }

            return true;
        }
    }

    onPlayerMessage(sender, message) {
        this.players.some(player => {
            if (player.name === sender.name) {
                player.say(message);
            }
        })
    }

    onMeRejoinGame(resObj) {
        if (this.isMePlaying()) {
            //TODO
        }
    }

    onPlayerReEnterGame(playerId, newUserId) {
        let player = this.findPlayer(playerId);
        if (player) {
            this._replaceUser(player, newUserId);
        }
    }

    handlePlayer(playerId, cmd, data) {

    }
}

app.createComponent(PlayerManager)