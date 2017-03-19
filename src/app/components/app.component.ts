import { Component } from '@angular/core';
import { GameObject } from "../models/game-object";
import { GameOptions } from "../models/game-options";

@Component({
  selector: 'my-app',
  templateUrl: './app/templates/main.html'
})
export class AppComponent { 
  currentGame: GameObject;
  isGameOngoing: boolean;

  startNewGame(gameOpts: GameOptions) {
    this.currentGame = new GameObject(gameOpts.rows, gameOpts.cols, gameOpts.mines);
  }

  replayPreviousGame(gameObj: GameObject) {
    let newGameObj = Object.assign(new GameObject(1, 1, 1), gameObj);
    newGameObj.resetGame();
    this.currentGame = newGameObj;
  }
 }