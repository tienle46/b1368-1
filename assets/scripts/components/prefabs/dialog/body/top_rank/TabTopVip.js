import app from 'app';
import Actor from 'Actor';

class TabTopVip extends Actor {
    constructor() {
        super();

        this.properties = {
            ...this.properties,
            contentNode: cc.Node,
            crowns: cc.Node,
            vips: cc.Node,
        };
    }

    onLoad() {
        super.onLoad();
    }

    start() {
        super.start();
        this._getRankGroup()
    }

    _addGlobalListener() {
        super._addGlobalListener();
        app.system.addListener(app.commands.RANK_GROUP, this._showBody, this);
    }

    _removeGlobalListener() {
        super._removeGlobalListener();
        app.system.removeListener(app.commands.RANK_GROUP, this._showBody, this);
    }

    _getRankGroup() {
        let topNodeId = 14,
            currentPage = 1;

        let sendObject = {
            'cmd': app.commands.RANK_GROUP,
            'data': {
                [app.keywords.RANK_GROUP_TYPE]: app.const.DYNAMIC_GROUP_LEADER_BOARD,
                [app.keywords.RANK_ACTION_TYPE]: app.const.DYNAMIC_ACTION_BROWSE,
                [app.keywords.PAGE]: currentPage,
                [app.keywords.RANK_NODE_ID]: topNodeId,
            }
        };
        app.system.showLoader();
        app.service.send(sendObject);
    }

    _showBody(d) {
        let ul = d[app.keywords.USERNAME_LIST];

        let data = [
            ul.map((status, index) => {
                if (this.crowns.children[index])
                    return cc.instantiate(this.crowns.children[index]);
                else
                    return `${index + 1}.`;
            }),
            ul,
            ul.map((status, index) => {
                let len = this.vips.children.length;
                return cc.instantiate(this.vips.children[index] ? this.vips.children[index] : this.vips.children[len - 1]);
            }),
        ];
        ul = null;

        this.initGridView({
            data: ['STT', 'Tài khoản', 'Loại'],
            options: {
                fontColor: app.const.COLOR_YELLOW
            }
        }, data, {
            height: 415,
        });

        this.contentNode.addChild(this.getGridViewNode());

        app.system.hideLoader();
    }
}

app.createComponent(TabTopVip);