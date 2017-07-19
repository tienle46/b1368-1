import app from 'app';
import HistoricalTable from 'HistoricalTable';
import NodeRub from 'NodeRub';

class TaiXiuHistoricalTable extends HistoricalTable {
    constructor() {
        super();
        
        this.properties = this.assignProperties({
            childLbl: cc.Label,
            faces: {
                default: [],
                type: [cc.Sprite]
            },
            facesAtlas: cc.SpriteAtlas
        });
    }

    onLoad() {
        super.onLoad();
    }
    
    /**
     * @override
     * 
     * @param {any} infors 
     * @memberof XocDiaStatisticTable
     */
    updateTableInfo(infors) {
        // //only update newest 32 cells
        // let numberCellsInTable = 32;
        // if (infors.length > numberCellsInTable)
        //     infors = infors.slice(0, numberCellsInTable + 1);

        // super.updateTableInfo(infors);
      
        // //0: even, 1: odd
        // let evens = infors.filter((type) => type === 0).length;
        // let odds = infors.filter((type) => type === 1).length;

        // this.evenLbl.string = evens;
        // this.oddLbl.string = odds;
    }
    
    /**
     * @interface
     * @param type:  0: even, 1: odd
     * @return cc.Node
     */
    modifyItem(type) {
        // // 0: white, 1: red
        // // let colors = ['blueTheme/ingame/xocdia/trang', 'blueTheme/ingame/xocdia/do'];
        
        // let cell = cc.instantiate(this.childItem);
        // cell.active = true;

        // NodeRub.addSpriteComponentToNode(cell, {spriteFrame: this.colors[type]});

        // return cell;
    }
}

app.createComponent(TaiXiuHistoricalTable);