/**
 * Created by Thanh on 11/19/2016.
 */

import app from 'app';
import CardList from 'CardList';
import Phom from 'Phom';
import PhomList from 'PhomList';
import Component from 'Component';
import PhomUtils from 'PhomUtils';
import ArrayUtils from 'ArrayUtils'
import CCUtils from 'CCUtils'

export default class PhomListComponent extends Component {
    constructor() {
        super();
        
        this.align = {
            default: CardList.ALIGN_CENTER,
            type: CardList.ALIGN
        }
        
        this.properties = this.assignProperties({
            phomPrefab: cc.Prefab,
            phomNodes: {
                default: [],
                type: [cc.Node]
            },
            cardScale: 0.6,
            space: 80,
        });

        this.phomList = null;
        this.phoms = null;
    }

    onLoad() {
        super.onLoad();
        this.phoms = [];
        this.down = [];
        this.phomList = new PhomList();
        
        this.phomNodes.forEach((phomNode, i) => {
            let phom = phomNode.getComponent('Phom');
            //phom.setProperties({space: this.space, scale: this.cardScale, alignment: this.align})
            // phom.setAlign(this.align);
            // phom.setSpace(this.space);
            // phom.setScale(this.cardScale);
            this.phoms[i] = phom;
        });

        this.phomList.push(...this.phoms);
    }

    onEnable(){
        super.onEnable()
        this.phomList.forEach(phom => phom.setProperties({space: this.space, scale: this.cardScale, alignment: this.align}))
    }

    clear() {
        this.phomList.clear();
    }

    _findFirstEmptyPhomComponentIndex() {
        if (this.phoms[0].cards.length == 0) {
            return 0;
        }

        if (this.phoms[1].cards.length == 0) {
            return 1;
        }

        if (this.phoms[2].cards.length == 0) {
            return 2;
        }

        return 3;
    }

    _onPhomListDataChanged(){
        this.phoms.forEach(phom => {
            CCUtils.setVisible(phom.node, phom.cards.length > 0)
        })
    }

    addPhomList(player, newPhomList, eatenCards = []) {
        let firstEmptyPhomComponentIndex = this._findFirstEmptyPhomComponentIndex();

        if (!player) {
            this._setPhomListWithoutPlayer(newPhomList, firstEmptyPhomComponentIndex, eatenCards);
        } else {
            newPhomList.phoms.forEach((newPhom, i) => {

                if (i < PhomList.MAX_PHOM_COUNT) {

                    let phom = this.phoms[i + firstEmptyPhomComponentIndex];
                    if (phom) {
                        if (player.isItMe()) {
                            player.renderer.cardList.transferTo(phom, newPhom.cards, () => this._sortCardList(phom));
                        } else {
                            newPhom.cards.forEach(card => card.locked = ArrayUtils.contains(eatenCards, card))
                            phom.transferFrom(player.renderer.cardList, newPhom.cards);
                        }

                        newPhom.renderComponent = phom;
                    }
                }
            });
        }

        this._onPhomListDataChanged()

        return newPhomList;
    }

    _sortCardList(cardList){
        if(cardList){
            PhomUtils.sortAsc(cardList.cards);
            cardList.onCardsChanged();
        }
    }

    _setPhomListWithoutPlayer(phomList, firstEmptyPhomComponentIndex, eatenCards = []) {
        phomList && phomList.phoms.forEach((phomModel, index) => {
            let phom = this.phoms[index + firstEmptyPhomComponentIndex];
            if (phom) {
                phomModel.cards.forEach(card => {
                    card.locked = ArrayUtils.contains(eatenCards, card)
                })
                phom && phom.setCards(phomModel.cards);
                phomModel.renderComponent = phom;
            }
        })
    }

    setAlign(align) {
        this.align = align;

        this.phoms.forEach(phom => phom.setAlign(this.align));
        this.node.setAnchorPoint(CardList.convertAlignmentToAnchor(align));
    }

    setSpace(space) {
        this.space = space;
        this.phoms.forEach(phom => phom.setSpace(this.space));
    }

    cleanHighlight() {
        this.phoms.forEach(phom => phom.cleanHighlight());
    }

    setHighlight(highlightPhom, highlight) {
        this.phoms.forEach(phom => phom.equals(highlightPhom) && phom.setHighlightAll(highlight));
    }

    addPhom(phomModel) {
        this.phoms.forEach(phom => {
            if (phom.cards.length == 0) {
                phom.setCards(phomModel.cards);
            }
        })

        this._onPhomListDataChanged()
    }
}

app.createComponent(PhomListComponent);