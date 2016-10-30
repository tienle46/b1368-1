import app from 'app';
import Component from 'Component';
import GridViewRub from 'GridViewRub';
import ExchangeDialog from 'ExchangeDialog';

class TabExchangeHistory extends Component {
    constructor() {
        super();
        this.GridViewCardTabRub = null;
        this.GridViewCardTabNode = null;
        this.flag = null;
    }

    onLoad() {
        // wait til every requests is done
        // this.node.active = false;

        // get content node
        // this.contentNode = this.node.getChildByName('view').getChildByName('content');
        // this._initItemsList();
        // init tabRub
        this._getExchangeDialogComponent().hideUpdatePhone();
        this._initData().then((data) => {
            this._initBody(data);
        });
        // this._initTabs();
    }

    _initData() {
        let sendObject = {
            'cmd': app.commands.EXCHANGE_HISTORY,
            'data': {
                [app.keywords.PAGE]: 1,
            }
        };


        return new Promise((resolve, reject) => {
            app.service.send(sendObject, (res) => {

                log(res);
                let pattern = /Mã thẻ[^]*,/;
                let d = [
                    res['dl'],
                    res['nl'],
                    res['sl'].map((status, index)=>{
                        switch (status){
                            case 1:
                            case 10:
                                return 'Không đủ điều kiện'
                            case 2:
                            case 11:
                                return 'Đang chờ duyệt thẻ';
                            case 3:
                            case 12:
                                if(pattern.exec(res['dtl'][index]).length > 0){
                                    return pattern.exec(res['dtl'][index])[0];
                                }
                                return '';

                            case 100:
                                return 'Giao dịch bị huỷ bỏ'

                        }
                    }),
                    res['sl'].map((status)=>{
                        switch (status){
                            case 1:
                            case 2:
                                return { text: 'NHẬN LẠI CHIP', button: { eventHandler: null } }
                            case 3:
                                return { text: 'NẠP VÀO GAME', button: { eventHandler: null } }
                            default:
                                return '';
                        }
                    }),
                ]
                resolve(d);
            });
        });
    }

    _initBody(d) {
        let bodyNode = this.node.getChildByName('body');

        let event = cc.Component.EventHandler(this.node, 'TabExchangeHistory', 'updateDataCardTab');
        GridViewRub.show(bodyNode, ['Thời gian', 'Loại vật phẩm', 'Thông tin',''], d, { position: cc.v2(2, 120), width: 715, event }).then((rub) => {
            this.GridViewCardTabRub = rub;
            this.GridViewCardTabNode = this.GridViewCardTabRub._getNode();
        });
    }

    _getExchangeDialogComponent() {
        // this node -> body -> dialog -> dialog (parent)
        let dialogNode = this.node.parent.parent.parent;
        return dialogNode.getComponent(ExchangeDialog);
    }

    _getUpdatePhoneNode() {
        return this._getExchangeDialogComponent().updatePhoneNode();
    }

    updateDataCardTab(sender, type) {
        if (type === app.const.SCROLL_EVENT.SCROLL_TO_BOTTOM) {
            this.flag = 'top';
        }

        if (this.flag === 'top' && type === app.const.SCROLL_EVENT.AUTO_SCROLL_ENDED) {
            this._requestCardData();
            this.flag = null;
        }
    }

    _requestCardData() {
        this.GridViewCardTabNode.then(() => {
            this.GridViewCardTabRub.updateData([
                ['01-08-2016 09:15:46', '07-07-2016 16:16:26', '01-07-2016 16:24:17', '01-07-2016 16:23:18', '13-06-2016 11:36:45', '07-06-2016 11:24:33', '05-06-2016 20:07:24', '05-06-2016 19:56:36', '04-06-2016 21:40:28', '04-06-2016 21:35:11'],
                ['Vina 50K', 'Viettel 50K', 'Viettel 20K', 'Viettel 20K', 'Viettel 20K', 'Viettel 20K', 'Viettel 20K', 'Viettel 20K', ' Mobi 20K', 'Vina 20K'],
                []
            ]);
        });
    }
}

app.createComponent(TabExchangeHistory);