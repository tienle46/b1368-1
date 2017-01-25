import app from 'app';
import Component from 'Component';
import DialogTab from 'DialogTab';
import RubUtils from 'RubUtils';
import NodeRub from 'NodeRub';

export default class Dialog extends Component {
    constructor() {
        super();

        this.properties = {
            tabs: DialogTab,
            bodyNode: cc.Node,
            titleLbl: cc.Label,
            bgTransparent: cc.Node
        };

        this.addedNodes = {};
    }

    onLoad() {
        super.onLoad();
        this.node.zIndex = app.const.dialogZIndex;
    }

    onEnable() {
        this.bgTransparent.on(cc.Node.EventType.TOUCH_START, () => true);
    }

    onDestroy() {
        super.onDestroy();
        this.addedNodes = null;
    }

    onCloseBtnClick() {
        // this.releaseAssets();

        this.node.parent.destroy();
        this.node.parent.removeFromParent();
    }

    addToBody(id, url, componentName, tabGroup, data) {
        if (!this.addedNodes[id]) {
            if (this._isNode(url)) {
                this._addContentNodeToBody(id, url, data);
            } else {
                this._addContentPrefabToBody(id, url, componentName, tabGroup, data);
            }
        } else {
            this._showBody(id, data);
        }
    }


    setTitle(string) {
        this.titleLbl.string = string.toUpperCase();
    }

    _showBody(id, data) {
        if (this.bodyNode.children) {
            this.bodyNode.children.map(node => {

                let component = node.getComponent(node._$tabComponentName);
                component && component.setData(data);

                node.active = (node.__uid == id);
            });
        }
    }

    _addContentPrefabToBody(id, prefabURL, componentName, tabGroup, data) {
        return RubUtils.loadRes(prefabURL).then((prefab) => {
            this.addAsset(prefab);
            let p = cc.instantiate(prefab);
            p.__uid = id;
            p._$tabComponentName = componentName;
            this._addChildToBody(id, p);

            if(componentName){
                /**
                 * @type {DialogActor}
                 */
                let tabComponent = p.getComponent(componentName);
                if(tabComponent){
                    tabComponent.setTabGroup(tabGroup);
                    tabComponent.setData(data);
                }
            }

            return p;
        }).catch((e) => {
            error('err', e);
        });
    }

    // add content node to body node
    _addContentNodeToBody(id, content, data) {
        if (content instanceof cc.Node) {
            let node = app._.cloneDeep(content);
            node.__uid = id;

            this._addChildToBody(id, node, data);
        } else if (content instanceof Promise) {
            content.then((node) => {
                // wait until resources are loaded.
                setTimeout(() => {
                    let n = app._.cloneDeep(node);
                    n.__uid = id;

                    this._addChildToBody(id, n, data);
                });
            });
        }
    }

    _isNode(value) {
        return value instanceof cc.Node || value instanceof Promise;
    }

    _addChildToBody(id, node, data) {
        let widget = {
            left: 0,
            top: 0,
            bottom: 0,
            right: 0
        };
        NodeRub.addWidgetComponentToNode(node, widget);
        node.setPosition(cc.v2(0, 0));
        node.active = false;

        this.addedNodes[id] = node;

        this.bodyNode.addChild(node);

        this._showBody(id, data);

        this.addNode(node); // <- assets will be removed
    }
}

app.createComponent(Dialog);