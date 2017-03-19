import { Component, Input, Output, EventEmitter } from '@angular/core';
import { GameOptions } from "../models/game-options";
import { SavedGamesService } from "../services/saved-games.service";
import { GameObject } from "../models/game-object";

@Component({
  selector: 'past-games',
  templateUrl: './app/templates/past-games.html'
})
export class PastGamesComponent  {
  @Input() controlsDisabled: boolean;
  @Output() startGame = new EventEmitter<GameOptions>();

  savedGames : GameObject[] = [];
  opened : boolean = false;

  fetchGames(): void {
    // set game options
    this.savedGamesService.getGames().then((games) => this.savedGames = games);
  }

  requestStartGame(gameObj : GameObject): void {
    // close dropdown
    this.opened = false;

    this.startGame.emit(gameObj);
  }

  constructor(private savedGamesService: SavedGamesService) {
      this.fetchGames();
   }
}