import { Component, Input, Output, EventEmitter } from '@angular/core';
import { GameOptions } from "../models/game-options";

@Component({
  selector: 'new-game-controls',
  templateUrl: './app/templates/new-game-controls.html',
})
export class NewGameControlsComponent  {
  @Input() controlsDisabled: boolean;
  @Output() startGame = new EventEmitter<GameOptions>();

  customGameOpts: GameOptions = new GameOptions(null, null, null);
  showCustomControls: boolean;
  opened: boolean = false;

  setGame(difficultyLevel:number): void {
    // close menu
    this.opened = false;
    // hide custom controls
    this.showCustomControls = false;

    // set game options
    let currentGameOpts: GameOptions;
    switch (difficultyLevel) {
      case 1:
        currentGameOpts = new GameOptions(5, 5, 5);
        break;
      case 2:
        currentGameOpts = new GameOptions(10, 7, 15);
        break;
      case 3:
        currentGameOpts = new GameOptions(12, 12, 25);
        break;
      case -1:
        currentGameOpts = this.customGameOpts;
        break;

      default:
        return;
    }

    // init game
    this.startGame.emit(currentGameOpts);
  }
}