/**
 * Created by Thanh on 8/23/2016.
 */

var Commands = {

};

Commands.XLAG = "xlag";
Commands.PING_CLIENT = "pg";


Commands.PAGE = "p";
Commands.SEARCH_KEY = "k";
Commands.USER_LIST_GAME_CODE = "gv";
Commands.USER_JOIN_LOBBY_ROOM = "jlr";
Commands.USER_LIST_GROUP = "lg";
//Commands.USER_UPDATE_GROUP = "rlg1"; /* change to rlg*/
Commands.USER_UPDATE_GROUP = "rlg";
//Commands.USER_LIST_ROOM_1 = "fr1";/* change to fr*/
Commands.NEW_NOTIFICATION_COUNT = "nnc";
Commands.USER_LIST_ROOM = "fr";
Commands.USER_JOIN_ROOM = "jr";
Commands.USER_QUICK_JOIN_ROOM = "qj";
Commands.USER_CREATE_ROOM = "cr";
Commands.USER_LIST_USER = "lu";
Commands.USER_GET_CHARGE_LIST = "p_ctl";
Commands.USER_SEND_CARD_CHARGE = "p_cc";
Commands.USER_CHECK_UPDATE_VERSION = "up_ver";
Commands.GET_GIAI_TRI_LIST = "o_gs";
Commands.SYSTEM_MESSAGE = "smsg";
Commands.NOTIFICATION_COUNT = "nc";
Commands.SELECT_PROFILE = "u_si";
Commands.UPDATE_PROFILE = "u_ui";
Commands.UPDATE_PHONE_NUMBER = "updatePhone";
Commands.DOWNLOAD_IMAGE = "cim";
Commands.UPLOAD_IMAGE = "uim";
Commands.PLAYER_CHAT = "chat";
Commands.USER_CHANGE_PASSWORD = "u_up";
Commands.UPDATE_GAME_OFFLINE = "e_go";
Commands.USER_UPDATE_PROFILE = "u_ui";
Commands.USER_PROFILE = "u_si";
Commands.USER_PROFILE_NEW = "userProfile";
Commands.USER_UPDATE_PASSWORD = "u_up";
Commands.PLAYER_REJOIN_ROOM = "rjd";
Commands.PLAYER_REENTER_ROOM = "red";
Commands.USER_ACHIEVEMENT = "ach";
Commands.USER_ACHIEVEMENT_DETAIL = "achd";
//Level
Commands.USER_LEVEL_UP = "clv";
Commands.CHANGE_LEVEL_EXP = "ce";
//Task
Commands.TASK_FINISH = "ntf";
Commands.TASK_LIST = "tl";
Commands.TASK_DETAIL = "td";
Commands.TASK_REGISTER = "rt";
//Store
Commands.STORE_TYPE_LIST = "gcl";
Commands.STORE_ITEM_LIST = "gil";
Commands.STORE_BUY_ITEM = "bi";
Commands.STORE_GIFT_ITEM = "gi";
Commands.STORE_ITEM_DETAIL = "gid";
Commands.ASSETS_GIFT_LIST = "ggl";
Commands.ASSETS_LIST = "ghl";
Commands.ASSETS_ITEM_DETAIL = "ghd";
Commands.ASSETS_REMOVE_ITEM = "ri";
Commands.ASSETS_GIFT_ACCEPT = "ag";
Commands.ASSETS_USE_ITEM = "ui";
//Player
Commands.PLAYERS_BALANCE_CHANGE = "cub";
Commands.PLAYER_READY = "rdy";
Commands.PLAYER_UNREADY = "urdy";
Commands.PLAYER_BET = "bet";
Commands.PLAYER_DOWN_CARD = "down";
Commands.PLAYER_CONTINUE = "con";
Commands.PLAYER_CHANGE_MIN_BET = "cb";
Commands.PLAYER_INVITE = "i";
Commands.PLAYER_KICK = "k";
//    Commands.PLAYER_DEAL_CARD = "sc";
// xi to game
Commands.PLAYER_SEND_CARD = "dc";
Commands.PLAYER_FACE_DOWN_CARD = "fd";
//    Commands.PLAYER_FACE_UP_CARD = "fu";
//fake
Commands.PLAYER_GET_TURN = "turn";
Commands.PLAYER_LOSE_TURN = "lose";
Commands.PLAYER_BALANCE_CHANGE = "ba_change";
Commands.PLAYER_LEAVE_BOARD = "user_leave";
Commands.SPECTATOR_TO_PLAYER = "s2p";
//
Commands.PLAYER_PLAY_CARD = "pc";
Commands.PLAYER_PLAY_BET_TURN = "bt";
Commands.PLAYER_SKIP_TURN = "st";
// danh 1 quan bai ra va u
Commands.PLAYER_PLAY_CARD_U = "pu";
/**
 * Player eat a card
 */
Commands.PLAYER_EAT_CARD = "eat";
/**
 * Player help a card or cards -- gui phom
 */
Commands.PLAYER_HELP_CARD = "hc";
/**
 * Player receive a card or cards from the -- boc
 */
Commands.PLAYER_TAKE_CARD = "rc";
//PlayerSam
Commands.PLAYER_BAO_XAM = "bx";
Commands.PLAYER_BAO_XAM_SUCCESS = "px";
//TLMN
Commands.PLAYER_TLMN_CONG = "cg";
//BaCay
Commands.BACAY_PLAYER_GA_HUC = "huc";
Commands.BACAY_PLAYER_HUC_ACCEPTED = "ha";
Commands.BACAY_PLAYER_KE_CUA = "kc";
Commands.BACAY_PLAYER_GOP_GA = "gopGa";
//Ranking
Commands.RANKING_GET_CATEGORY = "top_ca";
Commands.RANKING_GET_TRAU_VANG = "top_gb";
Commands.RANKING_GET_DAI_GIA = "top_rm";
Commands.RANKING_TOP_PLAYERS = "top_ep";
//Event
Commands.EVENT_GET_MSG = "u_sm";
Commands.EVENT_GET_MSG_DETAIL = "u_smd";
//Entertaiment
Commands.ENTER_GET_ENTER_LIST = "o_gs";
Commands.ENTER_UPDATE_GAME_OFFLINE = "e_go";
Commands.ENTER_GET_ALBUM_GROUP = "o_agx_lac";
Commands.ENTER_GET_ALBUM_LIST = "o_agx_la";
Commands.ENTER_GET_ALBUM = "o_agx_a";
Commands.ENTER_LIKE = "o_agx_li";
//Lottery
Commands.LOTTERY_GET_CATEGORY = "lt_ct";
Commands.LOTTERY_GET_LIST = "lt_l";
Commands.LOTTERY_GET_DETAIL = "lt_d";
//Store
Commands.SHOP_GET_LIST_CATEGORY = "sp_glc";
Commands.SHOP_GET_LIST_ITEM = "sp_gli";
Commands.SHOP_BUY_AVATAR = "sp_ba";
Commands.SHOP_VIEW_AVATAR_DETAIL = "sp_vad";
Commands.SHOP_GET_AVATAR_CATEGORY = "sp_gac";
//Chat
Commands.CHAT_GET_GROUP_ROOM_LIST = "ggrt";
Commands.CHAT_GET_ROOM_LIST = "grl";
Commands.CHAT_GET_USER_LIST = "gul";
Commands.CHAT_SEND_MESSAGE = "sm";
Commands.CHAT_SEND_PRIVATE_MESSAGE = "spm";
Commands.CHAT_CREATE_ROOM = "crc";
Commands.CHAT_JOIN_ROOM = "jrc";
Commands.CHAT_LEAVE_ROOM = "lrc";
Commands.CHAT_GET_MESSAGE_HISTORY = "gmh";
Commands.CHAT_INVITE_TO_ROOM = "irc";
Commands.CHAT_QUIT_ROOM = "qrmc";
Commands.CHAT_SEND_INVITE = "si";
Commands.CHAT_GET_INVITABLE_LIST = "gil";

Commands.COUNT_NEW_MESSAGE_FRIEND_REQUEST = "ni";
Commands.GET_CHARGE_RATE_LIST = "gcrl";

//Buddy
Commands.BUDDY_INIT_LIST = "bil";
Commands.GET_BUDDY_LIST_MUTUAL = "blm";
Commands.BUDDY_INVITE_FRIEND = "bif";
Commands.BUDDY_INVITE_RESULT = "bir";
Commands.BUDDY_PENDING_LIST_MUTUAL = "plm";
Commands.BUDDY_SEND_OFFLINE_MESSAGE = "som";
Commands.BUDDY_GET_OFFLINE_MESSAGE = "gom";
Commands.BUDDY_GET_OFFLINE_MESSAGE_LIST = "goml";
Commands.BUDDY_GET_INVITATION_LIST_MUTUAL = "ilm";
Commands.BUDDY_NEW_INVITATION = "bni";
Commands.BUDDY_GET_MUTUAL = "bm";
Commands.BUDDY_GO_ONLINE = "bgo";
Commands.BUDDY_REMOVE_INVITATION = "bri";
Commands.USER_GET_INVITE_CODE = "gii";
Commands.USER_UPDATE_INVITED_CODE = "urc";
//Board
Commands.BOARD_STATE_CHANGE = "cp";
Commands.BOARD_MASTER_CHANGE = "cma";
//Command
Commands.REQUEST_LIST_NEWSPAPER = "o_tin_lv";
Commands.REQUEST_LIST_CATEGORY = "o_tin_lc";
Commands.REQUEST_LIST_NEWS = "o_tin_ln";
Commands.REQUEST_NEWS_DETAIL = "o_tin_n";
//
Commands.HD_NAPTIEN = "o_pmg";
//Invite phone
Commands.INVITE_FRIEND = "u_ifr";
Commands.OUTGAME_GUIDE = "og_g";
//Util
Commands.SEND_FEEDBACK = "u_sfb";
Commands.RULE_OF_GAME = "o_rog";
//Soccer
Commands.SOCCER_GET_MATCH_LIST = "sml";
Commands.SOCCER_MATCH_INFO = "smi";
Commands.SOCCER_LEAVE_MATCH_WHATCHED = "slm";
Commands.SOCCER_LEAVE_LOBBY_ROOM = "sll";
Commands.SOCCER_MATCH_INFO_CHANGED = "smic";

// game co

Commands.CO_FROM_POS = "f";
Commands.CO_TO_POS = "t";
Commands.CO_UP_MOVE_NEW_VALUE = "nv";
Commands.CO_UP_MOVE_EAT_VALUE = "ev";
Commands.CO_CHIEU_TUONG_DOI_PHUONG_WHEN_MOVE_TO = "ct";
Commands.CO_REPLY_CAU_HOA = "a";
Commands.CO_TOTAL_TIME_REMAIN = "rt";
Commands.CO_TOTAL_TIME_REMAIN_ARRAY = "rtl";
Commands.CO_PLAYER_MOVE = Commands.PLAYER_PLAY_CARD;
Commands.CO_PLAYER_REQUEST_CAU_HOA = "ch";
Commands.CO_PLAYER_REPLY_CAU_HOA = "rch";
Commands.CO_PLAYER_XIN_THUA = "xt";


Commands.USER_SHARE_FB = "usfb";
//RANK
Commands.RANK_GROUP = "dcn";

// list item type doi thuong
Commands.EXCHANGE_LIST = "awd_li";
// doi thuong
Commands.EXCHANGE = "awd_req";
// lich su doi thuong
Commands.EXCHANGE_HISTORY = "awd_his";
// chi tiet lich su
Commands.EXCHANGE_HISTORY_DETAIL = "awd_hisd";

//admin message
Commands.LIST_SYSTEM_MESSAGE = "dcn";

//high light message
Commands.HIGH_LIGHT_MESSAGE = "hm";
Commands.INGAME_CHAT_MESSAGE_LIST = "gicml";

// Agency
Commands.AGENCY = "agent";
Commands.BANK_TRANSFER_POLICY = "bankTransferPolicy";

//TRANSFER TRANSACTION
Commands.TRANSFER_TRANSACTION = 'b_ath';

//TRANSACTION HISTORY
Commands.TRANSACTION_HISTORY = 'b_arh';

//Xoc Dia
Commands.XOCDIA_BET = 'bet';
Commands.XOCDIA_CANCEL_BET = 'cancelBet';
Commands.XOCDIA_HISTORY = 'shakeHistory';
Commands.START_GAME = 'startGame';
Commands.REGISTER_QUIT_ROOM = 'registerQuitRoom';
Commands.INVALID_PLAY_TURN = "invalidPlayTurn";
Commands.GET_BUDDY_DETAIL_INFO = "buddyDetailInfo";

// CHUYEN TIEN
Commands.USER_TRANSFER_CONFIG = 'getTransferInfo';
Commands.USER_TRANSFER_TO_USER = "b_at";
Commands.USER_GET_MONEY_FROM_BANK = "b_aw";
Commands.GET_BUDDY_INFO = "getBuddyInfo";
Commands.REQUEST_BUDDY = "requestBuddy";
Commands.CONFIRM_ADD_BUDDY = "confirmAddBuddy";

Commands.BANK_IN_HISTORY = "bankInHistory";
Commands.IOS_IN_APP_PURCHASE = "submitPurchase";
Commands.ANDROID_IN_APP_PURCHASE = "submitBilling";
Commands.GET_LIST_GAME_MINBET = "gmbl";
Commands.CLIENT_CONFIG = "clientConfig";
Commands.BANK_ACCOUNT_WITHDRAW_INFO = "b_awi";
Commands.GET_WITHDRAW_INFO = "getWithdrawInfo";
Commands.GET_DISPLAY_NAME = "getDisplayName";

// AVATAR
Commands.USER_AVATARS = "avatarUrls";
Commands.CHANGE_AVATAR = "changeAvatar";

Commands.GET_TOP_PLAYERS = "getTopPlayers";
Commands.GET_TOP_VIP_PLAYERS = "getTopVipPlayers";
Commands.GET_TOP_BALANCE_PLAYERS = "getTopBalancePlayers";

Commands.GET_PERSONAL_MESSAGES = "getPersonalMessages";
Commands.GET_SYSTEM_MESSAGES = "getSystemMessages";
Commands.CHANGE_PERSONAL_MESSAGE_STATE = "changePersonalMessageState";
Commands.CHANGE_SYSTEM_MESSAGE_STATE = "changeSystemMessageState";
Commands.GET_VIP_BENEFIT = "getVipBenefit";

Commands.LIST_HU = "sj_jl";
Commands.JAR_DETAIL = "sj_jd";
Commands.USER_GOT_JAR = "sj_sjl";

Commands.GIFT_CODE = "useGiftCode";
Commands.GET_TOTAL_TOPUP = "getTotalTopup";

Commands.USER_MSG_COUNT = "userMsgCount";
Commands.GET_EXCHANGE_DETAIL = "getExDetail";
Commands.CANCEL_EXCHANGE_REQUEST = "ceir";
Commands.GET_CHIPS_BACK = "getExRefund";
Commands.GET_CURRENT_GAME_DATA = "getCurrentGameData";
Commands.USER_DISCONNECTED = "userDisconnected";
Commands.REPLACE_FAKE_USER = "replaceFakeUser";

Commands.CANCEL_REJOIN = "cancelRejoin";

Commands.NOTIFICATION_MESSAGE = "notify";

Commands.MINIGAME_TAI_XIU_CHANGE_STATE = "mng_taixiuChangeState";
Commands.MINIGAME_TAI_XIU_BET = "mng_taixiuBet";
Commands.MINIGAME_TAI_XIU_GET_STATE = "mng_taixiuState";
Commands.MINIGAME_TAI_XIU_FOLLOW = "mng_taixiuFollow";
Commands.MINIGAME_TAI_XIU_UNFOLLOW = "mng_taixiuUnfollow";
Commands.MINIGAME_TAI_XIU_REMAIN_TIME = "mng_taixiuRemainTime";
Commands.MINIGAME_TAI_XIU_TOP_PLAYERS = "mng_taixiuTopPlayer";
Commands.MINIGAME_TAI_XIU_DICE_HISTORY = "mng_taixiuDiceHistory";
Commands.MINIGAME_TAI_XIU_BET_CHANGED = "mng_taixiuBetChanged";
Commands.MINIGAME_TAI_XIU_HISTORY = "mng_taixiuHistory";
Commands.MINIGAME_CHAT = "mng_taixiuChat";
Commands.MINIGAME_CHAT_HISTORY = "mng_taixiuChatHistory";
Commands.MINIGAME_TAI_XIU_GUIDE = "mng_taixiuGuide";
Commands.MINIGAME_TAI_XIU_GET_OPTION = "mng_taixiuGetOption";
Commands.MINIGAME_TAI_XIU_STOP = "mng_taixiuStop";

Commands.MINIGAME_MINI_POKER_SUBSCRIBE = "mng_pokerSubscribe";
Commands.MINIGAME_MINI_POKER_HISTORY = "mng_pokerHistory";
Commands.MINIGAME_MINI_POKER_TOP_PLAYER = "mng_pokerTopPlayer";
Commands.MINIGAME_MINI_POKER_SYNC_JACKPOT_VALUES = "mng_pokerSync";
Commands.MINIGAME_MINI_POKER_PLAY = "mng_pokerPlay";
Commands.MINIGAME_MINI_POKER_GET_CONFIG = "mng_pokerConfig";

Commands.MINIGAME_CAO_THAP_TOP_PLAYER = "mng_caoThapTopPlayer";
Commands.MINIGAME_CAO_THAP_HISTORY = "mng_caoThapHistory";
Commands.MINIGAME_CAO_THAP_HISTORY_DETAIL = "mng_caoThapHistoryDetail";
Commands.MINIGAME_CAO_THAP_START = "mng_caoThapStart";
Commands.MINIGAME_CAO_THAP_PLAY = "mng_caoThapPlay";
Commands.MINIGAME_CAO_THAP_END = "mng_caoThapEnd";
Commands.MINIGAME_CAO_THAP_CONFIG = "mng_caoThapConfig";
Commands.MINIGAME_CAO_THAP_SYNC = "mng_caoThapSync";

Commands.BANK_TRANSFER_HISTORY_DETAIL = "b_athd";
Commands.AGENCY_LIST = "agent";

module.exports = Commands;