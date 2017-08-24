import utils from 'PackageUtils';
import app from 'app';
import CardList from 'CardList';
import GameUtils from 'GameUtils';
import PlayerCardRenderer from 'PlayerCardRenderer';
import GameAnim from "../../components/anim/GameAnim";

export default class PlayerLiengRenderer extends PlayerCardRenderer {
    constructor() {
        super();
        
        this.properties = this.assignProperties({
            betComponent: cc.Node,
            betCoinNode: cc.Node,
            actionNode: cc.Node,
            actionLabel: cc.Label,
            actionActor: cc.Node,
            chipPrefab: cc.Prefab,
            topBetPositionAnchor: cc.Node,
            bottomLeftBetPositionAnchor: cc.Node,
            rightBetPositionAnchor: cc.Node,
            leftBetPositionAnchor: cc.Node,
            bottomRightBetPositionAnchor: cc.Node,
            masterIcon: cc.Node,
        });
        
        /**
         * @type {cc.Animation}
         */
        this.actionNodeAnim = null
        this.betLabel = null
        this.gopGaIcon = null
    }

    _addGlobalListener() {
        super._addGlobalListener();
    }

    _removeGlobalListener() {
        super._removeGlobalListener();
    }

    onLoad(){
        super.onLoad()

        this.betLabel = this.betCoinNode.getComponentInChildren(cc.Label);
    }

    onEnable(...args){
        super.onEnable(...args);
        this.actionNodeAnim = this.actionNode.getComponent(cc.Animation);
    }

    updatePlayerAnchor(anchorIndex){
        super.updatePlayerAnchor(anchorIndex);

        this._updatePlayerBetValueComponent();
    }

    _updatePlayerBetValueComponent(){

        let player = this.data.actor
        let anchor = null;
        
        if(player.isItMe()) {
            anchor = this.topBetPositionAnchor
        } else {
            switch(this.anchorIndex) {
                case 2: {
                    anchor = this.rightBetPositionAnchor
                    break;
                }
                case 3: {
                    anchor = this.bottomRightBetPositionAnchor
                    break;
                }
                case 4: {
                    anchor = this.bottomLeftBetPositionAnchor
                    break;
                }
                case 5: {
                    anchor = this.leftBetPositionAnchor
                    break;
                }
                default: { // 1
                    anchor = this.topBetPositionAnchor
                    break;
                }
            }
        }
        
        this.betComponent.setPosition(anchor.getPosition())
    }
    
    showBetAmount(amount){
        let formatted = GameUtils.formatBalanceShort(amount);
        this.betLabel.string = `${formatted}`;
    }

    revealAllCards(){
        this.cardList.cards.forEach(card => card.setReveal(true));
    }

    _getHandCardAlign(){
        let positionOnRight = this.scene.gamePlayers.playerPositions.isPositionOnRight(this.anchorIndex);
        return positionOnRight ? CardList.ALIGN_BOTTOM_RIGHT : CardList.ALIGN_BOTTOM_LEFT;
    }

    /**
     * @override
     * 
     * @param {any} player 
     * @returns 
     * @memberof PlayerLiengRenderer <- PlayerCardRenderer
     */
    _getCardAnchorPoint(player) {
        if(player && player.isItMe())
            return this.myCardAnchor;
        
        let positionOnRight = player && this.isPositionOnRight(player.anchorIndex);
        return positionOnRight ? this.defaultCardAnchor2 : this.defaultCardAnchor;
    }

    /**
     * @param cardList
     * @param isItMe
     * @override
     */
    _initHandCardList(cardList, isItMe){
        super._initHandCardList(cardList, isItMe);
        if (isItMe) {
            cardList.setSpace(70);
            cardList.setMaxDimension(350);
            cardList.setDraggable(false);
            cardList.setSelectable(false);
            
            cardList.setRevealOnClick(false);
            cardList.setReveal(true);
        } else {
            cardList.setSpace(50);
            cardList.setMaxDimension(350);
        }

        cardList.setAlign(CardList.ALIGN_CENTER);
    }

    showAction(text = ''){

        this.actionLabel.string = text;

        if(!utils.isEmpty(text)){
            utils.setVisible(this.actionActor, true);
        }
    }

    stopAllAnimation(){
        super.stopAllAnimation();
        this.actionNodeAnim && this.actionNodeAnim.stop();
    }

    /**
     * @override
     */
    clearCards(){
        if(this.scene.gameState != app.const.game.state.ENDING) {
            super.clearCards();
        }
    }
    
    playBetAnimation(betAmount){
        let coinChipAmount = this.scene.board.minBet > 0 ? Math.floor(betAmount / this.scene.board.minBet) : 1
        coinChipAmount = Math.min(coinChipAmount, 3)
        GameAnim.flyTo({fromNode: this.node, toNode: this.betCoinNode, amount: coinChipAmount, prefab: this.chipPrefab})
    }

    _reset(){
        super._reset();

        utils.setVisible(this.actionActor, false);
    }

    setVisibleMaster(visible = false) {
        utils.setActive(this.masterIcon, visible);
    }
    
    betComponentAppearance(show = true) {
        utils.setActive(this.betComponent, show)
    }

}

app.createComponent(PlayerLiengRenderer);