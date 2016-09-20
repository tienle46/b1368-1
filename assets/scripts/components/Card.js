import app from 'app'
import Component from 'Component'

export default class Card extends Component{

    constructor(rank, suit) {
        super();
        rank && suit && this.init(rank, suit);
        this.rankNode = cc.Label
        this.suitNode = cc.Sprite
        this.mainPic = cc.Sprite
        this.cardBG = cc.Sprite
        this.redTextColor = new cc.Color().fromHEX('#C01E2E')
        this.blackTextColor = new cc.Color().fromHEX('#2B2B2B')
        this.texFrontBG = cc.SpriteFrame
        this.texBackBG = cc.SpriteFrame
        this.texFaces = {
            default: [],
            type: cc.SpriteFrame
        }
        this.texSuitBig = {
            default: [],
            type: cc.SpriteFrame
        }
        this.texSuitSmall = {
            default: [],
            type: cc.SpriteFrame
        }
        this.clickListener = null
        this.selected = false
    }


    init(rank, suit) {
        // console.log(`rank / suit : ${rank} / ${suit}`);

        this.rank = rank;
        this.suit = suit;
        this.byteValue = (rank << 2 | suit & 0x03);

        let isFaceCard = this.rank > 10;

        if (isFaceCard) {
            this.mainPic.spriteFrame = this.texFaces[this.rank - 10 - 1];
        }
        else {
            this.mainPic.spriteFrame = this.texSuitBig[this.suit];
        }

        // for jsb
        this.rankNode.string = this._getRankName();

        if (this.isRedSuit()) {
            this.rankNode.node.color = this.redTextColor;
        }
        else {
            this.rankNode.node.color = this.blackTextColor;
        }

        this.suitNode.spriteFrame = this.texSuitSmall[this.suit];
    }

    initFromByte(byteValue){
        let rank = byteValue >> 2;
        let suit = byteValue & 0x03;
        this.byteValue = byteValue;
        this.init(rank, suit);

    }

    static from(byteValue){
        let rank = byteValue >> 2;
        let suit = byteValue & 0x03;
        this.byteValue = byteValue;
        this.init(rank, suit);

    }

    _getRankName(){
        switch (this.rank){
            case Card.RANK_J:
                return 'J'
            case Card.RANK_Q:
                return 'Q'
            case Card.RANK_K:
                return 'K'
            case Card.RANK_AT:
            case Card.RANK_ACE:
                return 'A'
            default:
                return '' + this.rank
        }
    }

    isRedSuit(){
        return this.suit === Card.SUIT_ZO || this.suit === Card.SUIT_CO;
    }
    reveal(isFaceUp) {
        this.rankNode.node.active = isFaceUp;
        this.rankNode.node.active = isFaceUp;
        this.mainPic.node.active = isFaceUp;
        this.cardBG.spriteFrame = isFaceUp ? this.texFrontBG : this.texBackBG;
    }


    listenOnClickListener(cb) {
        this._clickListener = cb;
    }

    handleClickItem() {
        this._clickListener && this._clickListener(this);
    }



}

Card.from = (cardByte) => {

    let rank = cardByte >> 2;
    let suit = cardByte & 0x03;
    let card = new Card(rank,suit)
    return card;
}
Card.equals = function (o) {
    return this.byteValue === o.byteValue;
};


Card.RANK_AT = 1;
Card.RANK_HAI = 2;
Card.RANK_BA = 3;
Card.RANK_BON = 4;
Card.RANK_NAM = 5;
Card.RANK_SAU = 6;
Card.RANK_BAY = 7;
Card.RANK_TAM = 8;
Card.RANK_CHIN = 9;
Card.RANK_MUOI = 10;
Card.RANK_J = 11;
Card.RANK_Q = 12;
Card.RANK_K = 13;
Card.RANK_ACE = 14;
Card.RANK_DEUCE = 15;

Card.SUIT_BICH = 0;
Card.SUIT_TEP = 1;
Card.SUIT_ZO = 2;
Card.SUIT_CO = 3;

Card.STATE_TO_MOVE = +1;
Card.STATE_ON_HAND = 0;
Card.STATE_TO_PUSH = -1;

Card.MOVEUP_CARD_DURATION = 0.08;
/**/
Card.FOCUS_OVER_INDEX = 0;
Card.SELECT_OVER_INDEX = 1;
Card.EAT_INDEX = 2;
/**/
Card.FIRST_CARD_GROUP = 0;
Card.SECOND_CARD_GROUP = 1;
Card.THIRD_CARD_GROUP = 2;
Card.VERTICAL_SPACE_TO_SECOND_POSITION_Y = 24;
/**/
Card.CARD_WIDTH = 75;
Card.CARD_HEIGHT = 100;
Card.CARD_SHADOW_LEFT_WIDTH = 2;
Card.CARD_SHADOW_RIGHT_WIDTH = 1;
Card.CARD_KNOW_LEFT = 13;
Card.CARD_KNOW_RIGHT = 58;
Card.CARD_KNOW_TOP = 13;
Card.CARD_KNOW_BOTTOM = 80;
Card.HAND_LEFT_MARGIN_RIGHT = 18;
Card.HAND_LEFT_MARGIN_BOTTOM = 50;
Card.HAND_RIGHT_MARGIN_LEFT = 17;
Card.HAND_RIGHT_MARGIN_BOTTOM = 30;


app.createComponent(Card)