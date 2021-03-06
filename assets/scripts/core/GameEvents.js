/**
 * Created by Thanh on 9/22/2016.
 */

var Events = module.exports;

Events.HANDLE_TURN_DURATION = "handle.turnDuration";
Events.HANDLE_CHANGE_TURN = "handle.changeTurn";
Events.HANDLE_PLAY_TURN = "handle.playTurn";
Events.HANDLE_PLAYER_PLAY_TURN = "handle.playerPlayTurn";
Events.HANDLE_LOSE_TURN = "handle.loseTurn";
Events.HANDLE_SKIP_TURN = "handle.skipTurn";
Events.HANDLE_GET_TURN = "handle.getTurn";
Events.HANDLE_GAME_STATE_CHANGE = "handle.gameStateChange";
Events.HANDLE_PLAYER_TAKE_CARD = "handle.playerTakeCard";
Events.HANDLE_PLAYER_EAT_CARD = "handle.playerEatCard";
Events.HANDLE_PLAYER_DOWN_CARD = "handle.playerDownCard";
Events.HANDLE_PLAYER_HELP_CARD = "handle.playerHelpCard";
Events.HANDLE_PLAYER_LEAVE_BOARD = "handle.playerLeaveBoard";
Events.HANDLE_PLAYER_BET = "handle.playerBet";
Events.HANDLE_PLAYER_CUOC_BIEN = "handle.playerGaHuc";
Events.HANDLE_PLAYER_ACCEPT_CUOC_BIEN = "handle.playerAcceptHuc";

Events.VISIBILITY_FEATURES_UPDATED = "visibility.feature.updated";

Events.USER_CHANGES_BALANCE = "user.changes.balance";

Events.HIDING_COMPONENTS = "hiding.components";

Events.CLIENT_CONFIG_CHANGED = "clientConfigChanged";

Events.SHOW_GAME_BEGIN_CONTROLS = "show.gameBeginControls";
Events.SHOW_WAIT_TURN_CONTROLS = "show.waitTurnControls";
Events.SHOW_ON_TURN_CONTROLS = "show.onTurnControls";
Events.SHOW_EAT_AND_TAKE_CONTROLS = "show.eatAndTakeControls";
Events.SHOW_PLAY_CONTROL_ONLY = "show.playControlOnly";
Events.SHOW_JOIN_PHOM_CONTROLS = "show.joinPhomControls";
Events.SHOW_DOWN_PHOM_CONTROLS = "show.downPhomControls";
Events.SHOW_U_PHOM_CONTROLS = "show.showUPhomControls";
Events.SHOW_PHOM_HIGHLIGHT = "show.phomHighlight";
Events.SHOW_BAO_XAM_CONTROLS = "show.baoSamControls";
Events.SHOW_BACAY_BET_CONTROLS = "show.bacay.betControls";
Events.SHOW_DOWN_CARD_CONTROLS = "show.downCardControls";
Events.SHOW_GOP_GA_NODE = "show.gopGaNode";
Events.SHOW_XOCDIA_BET_CONTROLS = "show.xocdia.betControls";
Events.SHOW_DOWN_CARD_CONTROLS = "show.downCardControls";
Events.SHOW_START_GAME_CONTROL = "show.startGameControl";
Events.SHOW_GAME_ENDING_INFO = "show.gameEndingInfo";
Events.SHOW_PLAY_CONTROL = "show.playControl";

Events.HIDE_ALL_CONTROLS = "hide.allControls";
Events.HIDE_GAME_BEGIN_CONTROLS = "hide.gameBeginControls";

Events.VISIBLE_INGAME_CHAT_COMPONENT = "visible.inGameChatComponent";
Events.VISIBLE_GAME_PHOM_HIGHLIGNT = "visible.gamePhomHighlight";

Events.ON_PLAYER_PLAYED_CARDS = "on.player.playedCards";
Events.ON_PLAYER_READY_STATE_CHANGED = "on.player.readyStateChanged";
Events.ON_PLAYER_REMAIN_CARD_COUNT = "on.player.setReadyState";
Events.ON_PLAYER_TURN = "on.player.getTurn";
Events.ON_PLAYER_CHANGE_BALANCE = "on.player.changeBalance";
Events.ON_PLAYER_CONG = "on.player.cong";
Events.ON_PLAYER_THOI = "on.player.thoi";
Events.ON_PLAYER_SET_BALANCE = "on.player.setBalance";
Events.ON_PLAYER_REENTER_GAME = "on.player.reenterGame";
Events.ON_PLAYER_CHAT_MESSAGE = "on.player.chatMessage";
Events.ON_PLAYER_BAO_XAM = "on.player.baoXam";
Events.ON_PLAYER_BAO_1 = "on.player.bao1";
Events.ON_PLAYER_BACAY_CHANGE_BET = "on.player.bacayChangeBet";
Events.ON_PLAYER_BACAY_GOP_GA = "on.player.bacayGopGa";
Events.ON_PLAYER_REGISTER_QUIT_ROOM = "on.player.registerQuitRoom";

Events.ON_USER_UPDATE_BALANCE = "on.user.updateBalance";
Events.ON_USER_UPDATE_LEVEL = "on.user.updateLevel";
Events.ON_USER_UPDATE_NEW_PLAYER = "on.user.updateNewPlayer";
Events.ON_USER_EXIT_ROOM = "on.user.exitRoom";
Events.ON_USER_UPDATE_EXP_POINT = "on.user.updateExpPoint";

Events.ON_ROOM_CHANGE_OWNER = "on.room.changeOwner";
Events.ON_ROOM_CHANGE_MASTER = "on.room.changeMaster";
Events.ON_ROOM_CHANGE_MIN_BET = "on.room.changeMinBet";

Events.ON_CLICK_PLAY_BUTTON = "on.click.playButton";
Events.ON_CLICK_SORT_BUTTON = "on.click.sortButton";
Events.ON_CLICK_SKIP_TURN_BUTTON = "on.click.skipTurnButton";
Events.ON_CLICK_EAT_CARD_BUTTON = "on.click.eatCardButton";
Events.ON_CLICK_TAKE_CARD_BUTTON = "on.click.takeCardButton";
Events.ON_CLICK_JOIN_PHOM_BUTTON = "on.click.joinPhomButton";
Events.ON_CLICK_SKIP_JOIN_PHOM_BUTTON = "on.click.skipJoinButton";
Events.ON_CLICK_DOWN_PHOM_BUTTON = "on.click.downPhomButton";
Events.ON_CLICK_SKIP_DOWN_PHOM_BUTTON = "on.click.skipDownButton";
Events.ON_CLICK_CHANGE_PHOM_BUTTON = "on.click.changePhomButton";
Events.ON_CLICK_CHANGE_JOIN_PHOM_BUTTON = "on.click.changeJoinButton";
Events.ON_CLICK_U_BUTTON = "on.click.uButton";
Events.ON_CLICK_DOI_U_TRON_BUTTON = "on.click.doiUTronButton";
Events.ON_CLICK_BAO_XAM_BUTTON = "on.click.baoXamButton";
Events.ON_CLICK_BO_BAO_XAM_BUTTON = "on.click.boBaoXamButton";
Events.ON_CLICK_BET_BUTTON = "on.click.betButton";
Events.ON_CLICK_HUC_BUTTON = "on.click.hucButton";
Events.ON_CLICK_KE_BUTTON = "on.click.keButton";
Events.ON_CLICK_REVEAL_BUTTON = "on.click.revealButton";
Events.ON_CLICK_DOWN_BUTTON = "on.click.downButton";
Events.ON_CLICK_CHOOSE_BET_BUTTON = "on.click.chooseBetButton";
Events.ON_CLICK_START_GAME_BUTTON = "on.click.startGameButton";
Events.ON_CLICK_WAIT_BUTTON = "on.click.waitButton";

Events.ON_PLAYER_TO = "on.player.to";
Events.ON_PLAYER_CHANGED_BET = "on.player.changed.bet";
Events.ON_FIRST_PLAYER_TO = "on.first.player.to";
Events.ON_LAST_PLAYER_TO = "on.last.player.to";

Events.ON_GAME_RESET = "on.game.reset";
Events.ON_GAME_WAIT = "on.game.wait";
Events.ON_GAME_STATE_BEGIN = "on.game.stateBegin";
Events.ON_GAME_STATE_STARTING = "on.game.stateStarting";
Events.ON_GAME_STATE_STARTED = "on.game.stateStarted";
Events.ON_GAME_STATE_PLAYING = "on.game.statePlaying";
Events.ON_GAME_STATE_ENDING = "on.game.stateEnding";
Events.ON_GAME_STATE_CHANGE = "on.game.stateChange";
Events.ON_GAME_STATE = "on.game.state";
Events.ON_GAME_STATE_TRUE_PLAY = "on.game.stateTruePlay";
Events.ON_GAME_LOAD_PLAY_DATA = "on.game.loadPlayData";
Events.ON_GAME_REJOIN = "on.game.rejoin";
Events.ON_GAME_SET_LAST_MOVE = "on.game.setLastMove";
Events.ON_GAME_CLEAN_TURN_ROUTINE_DATA = "on.game.cleanTurnRoutineData";
Events.ON_GAME_LOAD_DATA_AFTER_SCENE_START = "on.game.loadDataAfterSceneStart";
Events.ON_GAME_MASTER_CHANGED = "on.game.masterChanged";
Events.ON_GAME_STATE_CHANGED = "on.game.stateChanged"
Events.ON_GAME_STATE_PRE_CHANGE = "on.game.statePreChange"
Events.ON_GAME_REFRESH = "on.game.refresh"

Events.ON_ACTION_EXIT_GAME = "on.action.exitGame";
Events.ON_ACTION_LOAD_GAME_GUIDE = "on.action.loadGameGuide";

Events.SET_INTERACTABLE_PLAY_CONTROL = "set.interactablePlayControl";
Events.SET_INTERACTABLE_HA_PHOM_CONTROL = "set.interactableHaPhomControl";
Events.SET_INTERACTABLE_EAT_CONTROL = "set.interactableEatControl";
Events.SET_INTERACTABLE_JOIN_PHOM_CONTROL = "set.interactableJoinPhomControl";

Events.ADD_BET_TO_MASTER = "add.betToMaster";

Events.GAMEBET_ON_BOARD_UPDATE_PREVIOUS_HISTORY = "gamebet.on.board.update.previous.result.history";
Events.GAMEBET_ON_DISTRIBUTE_CHIP = "gamebet.on.distribute.chip";
Events.GAMEBET_ON_PLAYER_CANCELBET = "gamebet.on.player.cancelBet";
Events.GAMEBET_ON_PLAYER_BET = "gamebet.on.player.bet";
Events.GAMEBET_ON_PLAYER_TOSSCHIP_ANIMATION = "gamebet.on.player.tosschip.anim";
Events.GAMEBET_ON_PLAYER_CANCEL_BET_SUCCESS = "gamebet.on.player.cancel.bet.success";
Events.GAMEBET_ON_PLAYER_RECEIVE_CHIP_ANIMATION = "gamebet.on.player.receive.chip.anim";
Events.GAMEBET_ON_PLAYER_RUN_MONEY_BALANCE_CHANGE_ANIM = "gamebet.on.player.run.money.balance.change.anim";

Events.XOCDIA_ON_DISTRIBUTE_CHIP = "xocdia.on.distribute.chip";

Events.ON_USER_USES_ASSET = "on.user.uses.asset";

Events.ON_BUDDY_LIST_INITED = "on.buddy.listChanged";
Events.ON_BUDDY_MESSAGE = "on.buddy.message";
Events.ON_BUDDY_ADDED = "on.buddy.added";
Events.ON_BUDDY_REMOVED = "on.buddy.removed";
Events.ON_BUDDY_LIST_UPDATE = "on.buddy.update";
Events.ON_BUDDY_BLOCK_STATE_CHANGE = "on.buddy.blockedStateChange";
Events.ON_BUDDY_STATE_CHANGED = "on.buddy.StateChanged";
Events.ON_BUDDY_ONLINE_STATE_CHANGED = "on.buddy.onlineStateChanged";
Events.ON_BUDDY_MOOD_CHANGED = "on.buddy.moodChanged";
Events.ON_BUDDY_CHANGE_PLAYING_GAME = "on.buddy.changePlayingGame";
Events.ON_BUDDY_UNREAD_MESSAGE_COUNT_CHANGED = "on.buddy.unreadMessageCountChanged";

Events.CLEAN_GAME_AFTER_SHOW_RESULT = "clean.gameAfterShowResult";

Events.ON_USER_MAKES_JAR_EXPLOSION = "on.user.makes.jar.explosion";

Events.CHANGE_SYSTEM_MESSAGE_COUNT = "change.systemMessageCount";
Events.CHANGE_PERSONAL_MESSAGE_COUNT = "change.userMessageCount";
Events.ON_NEW_ADDED_PERSONAL_MESSAGE = "on.newAddedPersonalMessage";
Events.ON_NEW_ADDED_SYSTEM_MESSAGE = "on.newAddedSystemMessage";
Events.CHANGE_GAME_MASTER = "change.gameMaster";
Events.ON_MESSAGE_COUNT_CHANGED = "on.messageCountChanged";

Events.ON_PLAYER_BAO_XAM_RESPONSE = "on.playerBaoXamResponse";
Events.ON_LIST_HU_RESPONSE = "on.ListHuResponse";
Events.ON_LIST_HU_UPDATED = "on.ListHuUpdated";
Events.ON_SUBMIT_PURCHASE_IOS = "on.submitPurchaseIOS";
Events.ON_SUBMIT_PURCHASE_ANDROID = "on.submitPurchaseAndroid";

Events.ON_NEW_NOTIFICATION = "on.new.notification";

// hung sicbo
Events.TAI_XIU_TREO_ON_BET_BTN_CLICKED = "tai.xiu.treo.on.bet.btn.clicked";
Events.TAI_XIU_TREO_ON_CLOSE_BTN_CLICKED = "tai.xiu.treo.on.close.btn.clicked";
Events.TAI_XIU_TREO_ON_CONFIRM_BTN_CLICKED = "tai.xiu.treo.on.confirm.bet";
Events.TAI_XIU_TREO_ON_CANCEL_BTN_CLICKED = "tai.xiu.treo.on.cancel.btn.clicked";
Events.TAI_XIU_TREO_PREPARING_NEW_GAME = "tai.xiu.treo.preparing.new.game";
Events.TAI_XIU_TREO_SHOW_BET_GROUP_PANEL = "tai.xiu.treo.show.bet.group.panel";
Events.TAI_XIU_TREO_BET_TEXT_CLICKED = "tai.xiu.treo.bet.text.clicked";
Events.TAI_XIU_TREO_HISTORY_CLICKED = "tai.xiu.treo.history.clicked";
Events.TAI_XIU_TREO_SOI_CAU_CLICKED = "tai.xiu.treo.soicau.clicked";
Events.TAI_XIU_TREO_NAN_BTN_CLICKED = "tai.xiu.treo.nan.btn.clicked";
Events.TAI_XIU_TREO_RANK_BTN_CLICKED = "tai.xiu.treo.rank.clicked";
Events.TAI_XIU_TREO_ON_APP_STATE_CHANGED = "tai.xiu.treo.app.state.changed";
Events.TAI_XIU_TREO_ON_UPDATE_COUNT_DOWN = "tai.xiu.treo.popup.update.count.down";
Events.TAI_XIU_TREO_ON_COUNTING_DOWN = "tai.xiu.treo.popup.couting.down";
