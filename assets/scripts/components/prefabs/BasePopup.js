import app from 'app';
import Component from 'Component';

class BasePopup extends Component {
    constructor() {
        super();
        this.popUpContainner = {
            default: null,
            type: cc.Sprite
        };

        this.closeButton = {
            default: null,
            type: cc.Button
        };

        this.scrollview = {
            default: null,
            type: cc.Node
        };


    }

    // use this for initialization
    onLoad() {
        this.node.on('touchstart', function(event) {

        });

    }

    handleClosePopupAction() {
        this.closeButton.getComponent(cc.Animation).play();
        // console.log(this.node.parent);
        this.node.removeFromParent(true);
    }

    setContent(string) {
        var label = cc.find('layout', this.node).getComponent(cc.Label);
        label.string = string;
    }

}

app.createComponent(BasePopup);

// cc.Class({
//     extends: cc.Component,

//     properties: {


//         popUpContainner: {
//             default: null,
//             type: cc.Sprite
//         },

//         closeButton: {
//             default: null,
//             type: cc.Button
//         }

//     },

//     // use this for initialization
//     onLoad: function() {

//     },

//     handleClosePopupAction: function() {


//         this.closeButton.getComponent(cc.Animation).play();
//         this.node.removeFromParent(true);
//     }

//     // called every frame, uncomment this function to activate update callback
//     // update: function (dt) {

//     // },
// });