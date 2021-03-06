import app from 'app'
import Component from 'Component'
import CCUtils from 'CCUtils'
import GameUtils from 'GameUtils'

export default class BetTypeBtn extends Component {
    constructor() {
        super()
        
        this.properties = this.assignProperties({
            allLbl: cc.Label,
            ownLbl: cc.Label,
            allBetWrap: cc.Node,
            ownBetWrap: cc.Node
        })
        
        this.allBetAmount = 0
        this.ownBetAmount = 0
    }

    onLoad() {
        super.onLoad()

        this.reset()
    }
    
    onDestroy() {
        super.onDestroy()
        this.allBetAmount = 0
        this.ownBetAmount = 0 
    }
    
    reset() {
        this.setLbls(0)
        this.allBetAmount = 0
        this.ownBetAmount = 0 
    }
    
    showAllBetLbl() {
        CCUtils.setActive(this.allBetWrap)
    }
    
    hideAllBetLbl() {
        CCUtils.setActive(this.allBetWrap, false)
    }
    
    showOwnBetLbl() {
        CCUtils.setActive(this.ownBetWrap)
    }
    
    hideOwnBetLbl() {
        CCUtils.setActive(this.ownBetWrap, false)
    }
    
    show() {
        this.showAllBetLbl()
        this.showOwnBetLbl() 
    }
    
    hide() {
        this.hideAllBetLbl()
        this.hideOwnBetLbl() 
    }
    
    isShow() {
        return this.allBetWrap.active || this.ownBetWrap.active
    }
    
    setAllLbl(amount) {
        this.allBetAmount = amount
        this.allLbl.string = GameUtils.formatBalanceShort(this.allBetAmount)
    }

    setOwnLbl(amount) {
        this.ownBetAmount = amount
        this.ownLbl.string = GameUtils.formatBalanceShort(this.ownBetAmount)
    }

    setLbls(amount) {
        this.setAllLbl(amount)
        this.setOwnLbl(amount)
    }

    getAllLbl() {
        return this.allBetAmount
    }

    getOwnLbl() {
        return this.ownBetAmount
    }

    updateAllLbl(amount, isMinus) {
        isMinus && (amount *= -1)
        let rs = this.getAllLbl() + amount
        
        this.setAllLbl(rs < 0 ? 0 : rs)
    }

    updateOwnLbl(amount, isMinus) {
        isMinus && (amount *= -1)
        let rs = this.getOwnLbl() + amount
       
        this.setOwnLbl(rs < 0 ? 0 : rs)
    }

    updateLbls(amount, isMinus) {
        this.updateAllLbl(amount, isMinus)
        this.updateOwnLbl(amount, isMinus)
    }
}

app.createComponent(BetTypeBtn)