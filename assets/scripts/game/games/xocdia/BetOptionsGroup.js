import app from 'app';
import Component from 'Component';

class BetOptionsGroup extends Component {
    constructor() {
        super();

        this.checkedItem = null;
        this.userGoldLbl = {
            default: null,
            type: cc.Label
        };

        this.userGold = 0;
    }

    onLoad() {
        this.node.on('chip-checked', (event) => {
            event.stopPropagation();
            this.checkedItem = event.target;
        });

        this.userGold = app.context.getMyInfo().coin || 0;
        this.setUserGoldLbl(this.userGold);
    }

    setLblOptions(roomBet) {
        let multiples = [1, 5, 10, 50];
        this.node.children.filter((child) => child.name.indexOf('chip') > -1).forEach((child, index) => {
            let amount = multiples[index] * Number(roomBet);
            let betChip = child.getComponent('BetChip');
            betChip.roomBet = roomBet;
            let chipInfo = this.getChipInfoByAmount(amount, false);
            betChip.initChip(chipInfo);
        });
    }

    getCheckedItem() {
        return this.checkedItem;
    }

    updateUserGoldLbl(amount) {
        this.setUserGoldLbl(amount);
    }

    setUserGoldLbl(number) {
        this.userGold = Number(number);
        this.userGoldLbl.string = this.userGold.toLocaleString();
    }

    getRealUserGold() {
        return app.context.getMyInfo().coin;
    }

    getCurrentUserGold() {
        return Number(this.userGoldLbl.string.replace(',', ''));
    }

    getChipInfoByAmount(amount, isMiniChip = true) {
        return this.getCheckedItem().getComponent('BetChip').getChipInfoByAmount(amount, isMiniChip);
    }
}

app.createComponent(BetOptionsGroup);