import app from 'app';
import BaseScene from 'BaseScene';
import RubUtils from 'RubUtils';
import NodeRub from 'NodeRub';
import ArrayUtils from "../../utils/ArrayUtils";

export default class DashboardScene extends BaseScene {
    constructor() {
        super();
        this.gameList = [];

        this.viewContainer = {
            default: null,
            type: cc.Node
        };

        this.item = {
            default: null,
            type: cc.Prefab
        };

        this.topBar = {
            default: null,
            type: cc.Prefab
        };
    }

    onLoad() {
        var sendObject = {
            'cmd': 'gv',
            'data': {
                'pid': 1
            }
        };

        app.service.send(sendObject, (data) => {
            log(data);
            this.gameList = this._filterClientSupportedGames(data["cl"]);
            this._initItemListGame();
        }, app.const.scene.DASHBOARD_SCENE);


        //    handle bottom Bar event

        this._addBottomBar();
        this._addTopBar();
    }

    _filterClientSupportedGames(gameCodes) {
        return ArrayUtils.isEmpty(gameCodes) ? [] : gameCodes.filter(gc => {
            return gc == app.const.gameCode.PHOM || gc == app.const.gameCode.TLMNDL || gc == app.const.gameCode.XAM
        })
    }

    _initItemListGame() {

        const height = this.viewContainer.height || 200;
        const itemDimension = Math.floor(height / 2.0 - 37);

        let pageNodeOptions = {
            name: 'pageNode',
            size: cc.size(998, 515),
            // position: cc.v2(500, 0),
            widget: {
                top: 0,
                // left: 0,
                // right: 0,
                bottom: 0
            },
            layout: {
                type: cc.Layout.Type.GRID,
                resizeMode: cc.Layout.ResizeMode.CHILDREN,
                startAxis: cc.Layout.AxisDirection.VERTICAL,
                cellSize: cc.size(240, 240),
                padding: 0,
                spacingX: 125,
                spacingY: 20,
                verticalDirection: cc.Layout.VerticalDirection.TOP_TO_BOTTOM,
                horizontalDirection: cc.Layout.HorizontalDirection.LEFT_TO_RIGHT
            }
        };

        this.gameList = [...this.gameList];

        var node = null;

        this.gameList.forEach((gc, i) => {
            if (i % 6 === 0) {
                node = NodeRub.createNodeByOptions(pageNodeOptions);
                this.viewContainer.addChild(node);
            }

            let gameIconPath = app.res.gameIcon[gc];

            gameIconPath && cc.loader.loadRes(gameIconPath, cc.SpriteFrame, (err, spriteFrame) => {

                const nodeItem = new cc.instantiate(this.item);
                nodeItem.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                nodeItem.setContentSize(itemDimension, itemDimension);

                let itemComponent = nodeItem.getComponent('item');

                itemComponent.gameCode = gc;
                itemComponent.listenOnClickListener((gameCode) => {
                    log(`click Item ${gameCode}`);

                    // set game context
                    app.context.setSelectedGame(gc);

                    this.changeScene(app.const.scene.LIST_TABLE_SCENE);
                });

                node && node.addChild(nodeItem);
            });

            // if(gameIconPath) return true;
        });
    }

    // Listen Bottom Bar Event (Click button In Bottom Bar)

    _addBottomBar() {
        RubUtils.loadRes('bottombar/bottombar').then((prefab) => {
            let bottomBarNode = cc.instantiate(prefab);

            this.node.addChild(bottomBarNode);
        });
    }

    _addTopBar() {
        RubUtils.loadRes('dashboard/Topbar').then((prefab) => {
            let topbarNode = cc.instantiate(prefab);

            this.node.addChild(topbarNode);
        });

    }
}

app.createComponent(DashboardScene);