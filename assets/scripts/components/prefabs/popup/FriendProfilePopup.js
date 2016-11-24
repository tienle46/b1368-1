import app from 'app';
import Component from 'Component';
import NodeRub from 'NodeRub';

export default class FriendProfilePopup extends Component {
    constructor() {
        super();

        this.propsGridView = {
            default: null,
            type: cc.Layout,
        };

        this.rtUserName = {
            default: null,
            type : cc.RichText,
        };

        this.rtBalance = {
            default: null,
            type : cc.RichText,
        };
    }

    onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_START, () => null);
    }

    displayUserDetail(user){
        this.rtUserName.string = `<color=${app.const.HX_COLOR_YELLOW}>Tên:</color> ${user["u"]}`;
        this.rtBalance.string = `<color=${app.const.HX_COLOR_YELLOW}>Số xu:</color> ${user["coin"]}`;
    }

    propsItemClicked(e) {

        const clipName = e.target.name;

        const animation = this.node.getChildByName('animatedNode').getComponent(cc.Animation);
        // const animation = this.getComponent(cc.Animation);

        cc.loader.loadRes(`props/${clipName}`, cc.SpriteAtlas, (err, atlas) => {
            var spriteFrames = atlas.getSpriteFrames();

            var clip = cc.AnimationClip.createWithSpriteFrames(spriteFrames, 10);
            clip.name = 'run';
            clip.wrapMode = cc.WrapMode.Default;

            animation.addClip(clip);
            animation.play('run');
        });

    }

    loadPropsAssets() {
        cc.loader.loadResAll('props/thumbs', cc.SpriteFrame, function(err, assets) {
            if (err) {
                cc.error(err);
                return;
            }

            let gridViewHeigh = this.propsGridView.node.height;
            gridViewHeigh = (gridViewHeigh) / 2.0;

            assets.forEach((asset) => {
                // console.debug(`${index} `, asset);
                const clickEvent = new cc.Component.EventHandler();
                clickEvent.target = this.node;
                clickEvent.component = 'FriendProfilePopup';
                clickEvent.handler = 'propsItemClicked';

                let o = {
                    name: asset.name,
                    size: cc.size(gridViewHeigh, gridViewHeigh),
                    sprite: {
                        spriteFrame: asset,
                        trim: false,
                        type: cc.Sprite.Type.SIMPLE,
                        sizeMode: cc.Sprite.SizeMode.CUSTOM
                    },
                    button: {
                        event: clickEvent
                    }
                };
                const node = NodeRub.createNodeByOptions(o);

                this.propsGridView.node.addChild(node);
            });
        }.bind(this));
    }


    onLoad() {
        this.loadPropsAssets();
    }
}

app.createComponent(FriendProfilePopup);