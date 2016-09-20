
import app from 'app'
import utils from 'utils'
import CreateGameException from 'CreateGameException'
import Actor from 'Actor'

export default class Player extends Actor {

    constructor(board, user) {
        super();

        this.id = 0
        this.user = user
        this.board = board
        this.inited = false
        this.isOwner = false
        this.isMaster = false
        this.ready = false
    }

    onLoad(){
        super.onLoad()

        if(!this.board || !this.user){
            throw new CreateGameException("Dữ liệu khởi tạo bàn chơi không đúng");
        }

        this.username = this.user.name
        this.id = this.user.getPlayerId(this.board.room)
        this.balance = utils.getVariable(this.user, app.keywords.USER_VARIABLE_BALANCE, 0)

        this.renderer.setName(this.username)
        this.renderer.setBalance(this.balance)
        this.renderer.setVisibleOwner(this.isOwner)
    }

    setOwner(isOwner){
        this.isOwner = isOwner;
        this.renderer.setVisibleOwner(isOwner);
    }

    setMaster(isMaster){
        this.isMaster = isMaster;
        this.renderer.setVisibleMaster(isMaster);
    }

    setReady(ready){
        this.ready = ready
        this.renderer.setVisibleReady(this.ready)
    }

    resetReadyState() {
        this.setReady(false)
    }

    isItMe() {
        return this.user && this.user.isItMe
    }

    /**
     * Show message player want to say
     * @param message
     */
    say(message) {
        alert(`${this.name}: ${message}`)
    }

    stopTimeLine() {

    }

    startTimeLine(timeInSeconds) {

    }

    onSpectatorToPlayer(user) {

    }

    onPlayerToSpectator(user) {

    }

    onRejoin(remainCardCount, data) {

    }

    onBoardState(boardState, data = {}){
        switch (boardState){
            case app.const.game.board.state.BEGIN:
                this._onStateBegin(data)
                break;
            case app.const.game.board.state.STARTING:
                this._onStateStarting(data)
                break;
            case app.const.game.board.state.STARTED:
                this._onStateStarted(data)
                break;
            case app.const.game.board.state.PLAYING:
                this._onStatePlaying(data)
                break;
            case app.const.game.board.state.ENDING:
                this._onStateEnd(data)
                break;
        }
    }

    _onStateBegin(data) {

    }

    _onStateStarting(data) {

    }

    _onStateStarted(data) {

    }

    _onStatePlaying(data) {

    }

    _onStateEnd(data) {

    }
}