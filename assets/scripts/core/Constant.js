/**
 * Created by Thanh on 9/1/2016.
 */

var app = require('app');

app.const = {};
app.const.LANGUAGE = "vi"; // set the language used in app. Default: "vi"

app.const.scene = {};
app.const.scene.ENTRANCE_SCENE = "EntranceScene";
app.const.scene.LOGIN_SCENE = "LoginScene";
app.const.scene.REGISTER_SCENE = "RegisterScene";
app.const.scene.DASHBOARD_SCENE = "DashboardScene";
app.const.scene.GAME_SCENE = "GameScene";
app.const.scene.LIST_TABLE_SCENE = "ListTableScene";

app.const.gameCode = {};
app.const.gameCode.PHOM = 'pom';
app.const.gameCode.TLMNDL = 'tnd';
app.const.gameCode.TLMN = 'tln';
app.const.gameCode.TLMNM = 'tnm';
app.const.gameCode.XITO = 'xit';
app.const.gameCode.BA_CAY = 'bcy';
app.const.gameCode.LIENG = 'lie';
app.const.gameCode.XAM = 'xam';
app.const.gameCode.BAU_CUA = 'tcc';
app.const.gameCode.ALL = 'xga';

/**
 * System message type
 * @type {number}
 */
app.const.SYSTEM_MESSAGE_TYPE_TICKER = 1;
app.const.SYSTEM_MESSAGE_TYPE_POPUP = 0;
app.const.SYSTEM_MESSAGE_TYPE_ACTIVITY = 2;

/**
 * SCROLL EVENT TYPE
 */
app.const.SCROLL_EVENT = {};
app.const.SCROLL_EVENT.SCROLL_TO_TOP = 0;
app.const.SCROLL_EVENT.SCROLL_TO_BOTTOM = 1;
app.const.SCROLL_EVENT.SCROLL_TO_LEFT = 2;
app.const.SCROLL_EVENT.SCROLL_TO_RIGHT = 3;
app.const.SCROLL_EVENT.SCROLLING = 4;
app.const.SCROLL_EVENT.BOUNCE_TOP = 5;
app.const.SCROLL_EVENT.BOUNCE_BOTTOM = 6;
app.const.SCROLL_EVENT.BOUNCE_LEFT = 7;
app.const.SCROLL_EVENT.BOUNCE_RIGHT = 8;
app.const.SCROLL_EVENT.AUTO_SCROLL_ENDED = 9; // while we pull scroll bar over ended edge
app.const.SCROLL_EVENT.TOUCH_ENDED = 10; // touch ended