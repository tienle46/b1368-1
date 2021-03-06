/**
 * Created by Thanh on 9/28/2016.
 */

import app from 'app';
import PlayerTurnBaseAdapter from 'PlayerTurnBaseAdapter';
import {utils, GameUtils} from 'PackageUtils';
import {Commands, Keywords} from 'core';
import {Events} from 'events';

export default class PlayerCardTurnBaseAdapter extends PlayerTurnBaseAdapter {
    constructor(player) {
        super(player);
    }

    /**
     * @abstract
     */
    handlePlayTurn(data){
        let playerId = utils.getValue(data, Keywords.PLAYER_ID);
        let cards = GameUtils.convertBytesToCards(utils.getValue(data, Keywords.GAME_LIST_CARD, []));

        if(this.player.id === playerId && cards.length > 0){
            this.player.isItMe() && (cards = this.player.findCards(cards));
            this.scene.emit(Events.ON_PLAYER_PLAYED_CARDS, playerId, cards, this.player.renderer.cardList, this.player.isItMe());
            this.player._onPlayerPlayedCards && this.player._onPlayerPlayedCards(cards, this.player.renderer.cardList, this.player.isItMe());
        }
    }

    /**
     * @abstract
     */
    playTurn(cards = []){
        if(cards.length == 0) return;

        let cardBytes = GameUtils.convertToBytes(cards);
        let sendParams = {
            cmd: Commands.PLAYER_PLAY_CARD,
            data: {
                [Keywords.GAME_LIST_CARD]: cardBytes
            },
            room: this.scene.room
        }

        app.service.send(sendParams);
        this.player.isItMe() && this.scene.emit(Events.SHOW_WAIT_TURN_CONTROLS);
    }

    onTurn(){
        super.onTurn();
        if(this.player.isItMe()){
            this.player.renderer.cardList.onSelectedCardChanged();
        }
    }
}