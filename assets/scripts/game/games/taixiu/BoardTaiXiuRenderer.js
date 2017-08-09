import app from 'app';
import BoardGameBetRenderer from 'BoardGameBetRenderer';

export default class BoardTaiXiuRenderer extends BoardGameBetRenderer {
    constructor() {
        super();
        
        this.properties = this.assignProperties({
            clockNode: cc.Node,
            clockAtlas: cc.SpriteAtlas
        });
        
        this.HISTORIAL_COMPONENT = 'TaiXiuHistoricalTable';
        this.SHAKEN_CONTROL = 'TaiXiuShakenControl';
    }
    
    onLoad() {
        super.onLoad();
        
        this.clockNode.opacity = 0;
    }
    
    /**
     * 
     * 
     * @param {any} result text
     * @memberof BoardTaiXiuRenderer
     */
    displayResult(result) {
        console.warn('result', result);
    }
    
    toggleTable() {
        this.historicalTable.toggleTable();
    }
    
    clockAppearance(isShow = true, isRunAction = true) {
        let action = cc[isShow ? 'fadeIn': 'fadeOut'](.3);
        if(isRunAction) {
            this.clockNode.runAction(action);
        } else {
            return action;
        }
    }
    
    /**
     * 
     * @param {any} duration (seconds)
     * @memberof BoardTaiXiuRenderer
     */
    alarm(duration) {
        //TODO: vibrating animation
        // (-2) == shake in 3s
        let clipName = 'shake';
        this.clockNode.runAction(cc.sequence(cc.delayTime(duration - 2), cc.callFunc(() => {
            const animation = this.clockNode.getComponent(cc.Animation) || this.clockNode.addComponent(cc.Animation);

            const sprite = this.clockNode.getComponent(cc.Sprite) || this.clockNode.addComponent(cc.Sprite);
            sprite.spriteFrame = this.clockAtlas.getSpriteFrames()[0];

            let spriteFrames = this.clockAtlas.getSpriteFrames();
            let clip = cc.AnimationClip.createWithSpriteFrames(spriteFrames, 5);
            clip.name = clipName;
            clip.wrapMode = cc.WrapMode.Default;
            
            //TODO: run sound
            animation.addClip(clip);
            animation.play(clip.name);
            animation.on('finished', () => {
                animation.play(clip.name);
            });
        }), cc.delayTime(3), cc.callFunc(() => {
            const animation = this.clockNode.getComponent(cc.Animation) || this.clockNode.addComponent(cc.Animation);
            let state = animation.getAnimationState(clipName);
            if(state.isPlaying) {
                animation.pause(clipName);
            }
            animation.removeClip(clipName);
            this.clockAppearance(false) 
        })));
    }
    
    displayBowlWrap() {
        this.shakenControl.wrapper.active = true;
    }
}

app.createComponent(BoardTaiXiuRenderer);