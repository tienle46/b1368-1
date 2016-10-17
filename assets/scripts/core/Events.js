/**
 * Created by Thanh on 9/22/2016.
 */

var Events = module.exports;

Events.HANDLE_TURN_DURATION             = "handleTurnDuration";
Events.HANDLE_CHANGE_TURN               = "handleChangeTurn";
Events.HANDLE_PLAY_TURN                 = "handlePlayTurn";
Events.HANDLE_LOSE_TURN                 = "handleLoseTurn";
Events.HANDLE_SKIP_TURN                 = "handleSkipTurn";
Events.HANDLE_GET_TURN                  = "handleGetTurn";
Events.HANDLE_GAME_STATE_CHANGE        = "handleGameStateChange";

Events.SHOW_WAIT_TURN_CONTROLS          = "showWaitTurnControls";
Events.SHOW_ON_TURN_CONTROLS            = "showOnTurnControls";
Events.SHOW_GAME_BEGIN_CONTROLS         = "showGameBeginControls";
Events.CLEAN_TURN_ROUTINE_DATA          = "cleanTurnRoutineData";

Events.ON_PLAYER_PLAYED_CARDS           = "onPlayerPlayedCards";
Events.ON_PLAYER_READY_STATE_CHANGED    = "player.readyStateChanged";
Events.ON_PLAYER_REMAIN_CARD_COUNT      = "onPlayerSetReadyState";
Events.ON_PLAYER_TURN                   = "onPlayerGetTurn";
Events.ON_PLAYER_CHANGE_BALANCE         = "onPlayerChangeBalance";
Events.ON_PLAYER_CONG                   = "onPlayerCong";
Events.ON_PLAYER_THOI                   = "onPlayerThoi";
Events.ON_PLAYER_SET_BALANCE            = "onPlayerSetBalance";
Events.ON_PLAYER_REENTER_GAME           = "on.player.reenterGame";

Events.ON_USER_UPDATE_BALANCE           = "onUserUpdateBalance";
Events.ON_USER_UPDATE_LEVEL             = "onUserUpdateLevel";
Events.ON_USER_UPDATE_EXP_POINT         = "onUserUpdateExpPoint";

Events.ON_ROOM_CHANGE_OWNER             = "on.room.changeOwner";
Events.ON_ROOM_CHANGE_MASTER            = "on.room.changeMaster";
Events.ON_ROOM_CHANGE_MIN_BET           = "on.room.changeMinBet";

Events.ON_CLICK_PLAY_BUTTON             = "onClickPlayButton";
Events.ON_CLICK_SORT_BUTTON             = "onClickSortButton";
Events.ON_CLICK_SKIP_TURN_BUTTON        = "onClickSkipTurnButton";

Events.ON_GAME_STATE_BEGIN              = "onGameStateBegin";
Events.ON_GAME_STATE_STARTING           = "onGameStateStarting";
Events.ON_GAME_STATE_STARTED            = "onGameStateStarted";
Events.ON_GAME_STATE_PLAYING            = "onGameStatePlaying";
Events.ON_GAME_STATE_ENDING             = "onGameStateEnding";
Events.ON_GAME_STATE_CHANGE             = "onGameStateChange"
Events.ON_GAME_LOAD_PLAY_DATA           = "onGameLoadPlayData";
Events.ON_GAME_REJOIN                   = "on.game.rejoin";
Events.ON_GAME_SET_LAST_MOVE            = "on.game.setLastMove";

Events.GAME_USER_EXIT_ROOM              = "gameUserExitRoom";

Events.ON_ACTION_EXIT_GAME              = "action.exitGame";
Events.ON_ACTION_LOAD_GAME_GUIDE        = "action.loadGameGuide";

Events.SET_INTERACTABLE_PLAY_CONTROL    = "set.interactablePlayControl";