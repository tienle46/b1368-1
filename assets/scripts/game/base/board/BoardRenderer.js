/**
 * Created by Thanh on 9/16/2016.
 */

import app from 'app';
import utils from 'utils';
import ActorRenderer from 'ActorRenderer';
import TextView from 'TextView';

export default class BoardRenderer extends ActorRenderer {
    constructor() {
        super();

        this.properties = {
            ...this.properties,
            timeline: cc.Node,
            timelineTextViewNode: cc.Node
        }

        this.timelineTextView = null;
        this.ellipseTimeLine = null;
    }

    onEnable() {
        super.onEnable();

        this.timelineTextView = this.timelineTextViewNode.getComponent('TextView');
        this.ellipseTimeLine = this.timeline.getComponent('EllipseTimeLine');
        this.hideTimeLine();
    }

    _reset() {
        this.hideTimeLine();
    }

    hideTimeLine() {
        this.ellipseTimeLine.stop();
        this.setTimeLineMessage("");
        utils.deactive(this.timeline);
    }

    showTimeLine(timeInSecond = 0, message) {
        if (timeInSecond <= 0) {
            return;
        }

        if (!utils.isString(message) || utils.isEmpty(message)) {
            message = app.res.string('game_waiting');
        }

        utils.active(this.timeline);
        this.setTimeLineMessage(message);
        this.ellipseTimeLine.startTimeline(timeInSecond);
    }

    setTimeLineMessage(message) {
        this.timelineTextView.setText(message);
    }
}

app.createComponent(BoardRenderer);