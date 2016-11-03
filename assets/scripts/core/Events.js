/**
 * Created by Thanh on 9/22/2016.
 */

var Events = module.exports;

Events.HANDLE_TURN_DURATION             = "handle.turnDuration";
Events.HANDLE_CHANGE_TURN               = "handle.changeTurn";
Events.HANDLE_PLAY_TURN                 = "handle.playTurn";
Events.HANDLE_LOSE_TURN                 = "handle.loseTurn";
Events.HANDLE_SKIP_TURN                 = "handle.skipTurn";
Events.HANDLE_GET_TURN                  = "handle.getTurn";
Events.HANDLE_GAME_STATE_CHANGE         = "handle.gameStateChange";

Events.SHOW_WAIT_TURN_CONTROLS          = "show.waitTurnControls";
Events.SHOW_ON_TURN_CONTROLS            = "show.onTurnControls";
Events.SHOW_GAME_BEGIN_CONTROLS         = "show.gameBeginControls";

Events.VISIBLE_INGAME_CHAT_COMPONENT    = "visible.inGameChatComponent";

Events.ON_PLAYER_PLAYED_CARDS           = "on.player.playedCards";
Events.ON_PLAYER_READY_STATE_CHANGED    = "on.player.readyStateChanged";
Events.ON_PLAYER_REMAIN_CARD_COUNT      = "on.player.setReadyState";
Events.ON_PLAYER_TURN                   = "on.player.getTurn";
Events.ON_PLAYER_CHANGE_BALANCE         = "on.player.changeBalance";
Events.ON_PLAYER_CONG                   = "on.player.cong";
Events.ON_PLAYER_THOI                   = "on.player.thoi";
Events.ON_PLAYER_SET_BALANCE            = "on.player.setBalance";
Events.ON_PLAYER_REENTER_GAME           = "on.player.reenterGame";
Events.ON_PLAYER_CHAT_MESSAGE           = "on.player.chatMessage";

Events.ON_USER_UPDATE_BALANCE           = "on.user.updateBalance";
Events.ON_USER_UPDATE_LEVEL             = "on.user.updateLevel";
Events.ON_USER_UPDATE_EXP_POINT         = "on.user.updateExpPoint";
Events.ON_USER_EXIT_ROOM                = "on.user.exitRoom";

Events.ON_ROOM_CHANGE_OWNER             = "on.room.changeOwner";
Events.ON_ROOM_CHANGE_MASTER            = "on.room.changeMaster";
Events.ON_ROOM_CHANGE_MIN_BET           = "on.room.changeMinBet";

Events.ON_CLICK_PLAY_BUTTON             = "on.click.playButton";
Events.ON_CLICK_SORT_BUTTON             = "on.click.sortButton";
Events.ON_CLICK_SKIP_TURN_BUTTON        = "on.click.skipTurnButton";

Events.ON_GAME_STATE_BEGIN              = "on.game.stateBegin";
Events.ON_GAME_STATE_STARTING           = "on.game.stateStarting";
Events.ON_GAME_STATE_STARTED            = "on.game.stateStarted";
Events.ON_GAME_STATE_PLAYING            = "on.game.statePlaying";
Events.ON_GAME_STATE_ENDING             = "on.game.stateEnding";
Events.ON_GAME_STATE_CHANGE             = "on.game.stateChange"
Events.ON_GAME_LOAD_PLAY_DATA           = "on.game.loadPlayData";
Events.ON_GAME_REJOIN                   = "on.game.rejoin";
Events.ON_GAME_SET_LAST_MOVE            = "on.game.setLastMove";
Events.ON_GAME_CLEAN_TURN_ROUTINE_DATA  = "on.game.cleanTurnRoutineData";

Events.ON_ACTION_EXIT_GAME              = "on.action.exitGame";
Events.ON_ACTION_LOAD_GAME_GUIDE        = "on.action.loadGameGuide";

Events.SET_INTERACTABLE_PLAY_CONTROL    = "set.interactablePlayControl";
