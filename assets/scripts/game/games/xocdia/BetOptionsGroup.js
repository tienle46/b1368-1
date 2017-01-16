import app from 'app';
import Component from 'Component';

class BetOptionsGroup extends Component {
    constructor() {
        super();

        this.checkedItem = null;

        this.chips = [];
        this.multiples = [1, 5, 10, 50];
    }

    onLoad() {
        this.node.on('chip-checked', (event) => {
            event.stopPropagation();
            if (this.checkedItem) {
                let chip = this.checkedItem.getComponent('BetChip');
                chip && chip.setLblColor(app.const.COLOR_WHITE);
            }
            this.checkedItem = event.target;
        });

    }

    setLblOptions(roomBet) {
        this.chips = [];
        this.node.children.filter((child) => child.name.indexOf('chip') > -1).forEach((child, index) => {
            let amount = this.multiples[index] * Number(roomBet);
            let betChip = child.getComponent('BetChip');
            betChip && betChip.setChipAmountLbl(amount);
            this.chips.push(betChip);
        });
    }

    getCheckedItem() {
        return this.checkedItem;
    }

    getChip() {
        return this.getCheckedItem().getComponent('BetChip').getChipIcon(cc.size(25, 25));
    }

    getChipByAmount(amount) {
        let chipComponent = this.chips.find((chip) => amount == chip.amount);
        let chip = chipComponent && chipComponent.getChipIcon(cc.size(25, 25));
        return chip || this.getChip();
    }

    getChipIndexByAmount(amount, minBet) {
        return minBet > 0 ? this.multiples.indexOf(amount / minBet) : -1;
    }
}

app.createComponent(BetOptionsGroup);