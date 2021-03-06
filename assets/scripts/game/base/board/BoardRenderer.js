/**
 * Created by Thanh on 9/16/2016.
 */

import app from 'app';
import utils from 'PackageUtils';
import ActorRenderer from 'ActorRenderer';

export default class BoardRenderer extends ActorRenderer {
    constructor() {
        super();
        
        this.properties = this.assignProperties({
            timelineTextViewNode: cc.Node,
            bottomTimelineTextViewNode: cc.Node,
            secondTimelineLabelNode: cc.Node,
            timeline: {
                default : null,
                type : cc.Node
            }
        });

        this.chipPrefab = {
            default: null,
            type: cc.Prefab
        };

        this.timelineTextView = null;
        this.bottomTimelineTextView = null;
        this.secondTimelineLabel = null;
        this.ellipseTimeLine = null;
        this.enableBottomTextOnReady = true
        this.timeoutInterval = null
        this.timeLineInSecond = 0
    }

    onLoad(){
        super.onLoad()

        this.timelineTextView = this.timelineTextViewNode.getComponent('TextView');
        this.bottomTimelineTextView = this.bottomTimelineTextViewNode && this.bottomTimelineTextViewNode.getComponent('TextView');
        this.secondTimelineLabel = this.secondTimelineLabelNode && this.secondTimelineLabelNode.getComponent(cc.Label);
        this.ellipseTimeLine = this.timeline.getComponent('EllipseTimeLine');

        this.setTimeLineMessage("");
        this.setTimeLineSecondText("");
        this.setBottomTimeLineMessage("");
    }

    onEnable() {
        super.onEnable();
        this.hideTimeLine();
    }

    _reset() {
        this.hideTimeLine();
    }

    hideTimeLine() {
        if (this.ellipseTimeLine) {
            this.ellipseTimeLine.stop();
        }

        this.setTimeLineMessage("");
        this.setTimeLineSecondText("");
        this.setBottomTimeLineMessage("");

        this.timeoutInterval > 0 && clearInterval(this.timeoutInterval)
    }
    
    showTimeLineCountDown(timeInSecond, showProgressBar = true, callBackInterval, context) {
        !showProgressBar && this.ellipseTimeLine && this.ellipseTimeLine.hideProgressBar();
        this.timeLineInSecond = timeInSecond;
        this.setTimeLineMessage("");
        this.setTimeLineSecondText(`${this.timeLineInSecond--}`);
        // this.setBottomTimeLineMessage(app.res.string('game_waiting_for_game_start'))
        this.setBottomTimeLineMessage('')

        this.timeoutInterval = setInterval(() => {
            if(this.timeLineInSecond < 0){
                this.hideTimeLine()
            }else{
                callBackInterval && callBackInterval.call(context, this.timeLineInSecond)
                
                this.setTimeLineSecondText(`${this.timeLineInSecond--}`)
            }
        }, 1000);
    }
    
    isEnableBottomTimeLineTextOnReady(){
        return this.enableBottomTextOnReady && app.system.currentScene && app.system.currentScene.gameState == app.const.game.state.READY
    }

    showTimeLine(timeInSecond = 0, message, hiddenText = false) {
        if (timeInSecond <= 0) {
            return;
        }

        if (!utils.isString(message) || utils.isEmpty(message)) {
            message = app.res.string('game_waiting');
        }

        hiddenText && (message = '');

        if (this.isEnableBottomTimeLineTextOnReady()) {
            this.showTimeLineCountDown(timeInSecond)
        } else {
            this.setTimeLineMessage(message);
            this.setBottomTimeLineMessage("")
        }

        this.ellipseTimeLine.startTimeLine(timeInSecond);
    }

    setTimeLineSecondText(secondText) {
        this.secondTimelineLabel && (this.secondTimelineLabel.string = secondText)
    }

    setTimeLineMessage(message) {
        this.timelineTextView.setText(message);
    }

    setBottomTimeLineMessage(message) {
        this.bottomTimelineTextView && this.bottomTimelineTextView.setText(message);
    }
}

app.createComponent(BoardRenderer);