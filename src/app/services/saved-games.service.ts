import { Injectable } from '@angular/core';
import { GameObject } from "../models/game-object";

@Injectable()
export class SavedGamesService {
    getGames() : Promise<GameObject[]> {
        return Promise.resolve(this.games);
    }

    addGame(currentGame : GameObject) : void {
        this.games.push(currentGame);

        // update stats
        if (!currentGame.rerun) {
            this.totalGames++;
            // win condition
            if (currentGame.uncoveredTiles === 0) {
                this.gamesWon++;
                if (!this.bestTime || currentGame.timeElapsed < this.bestTime) {
                    this.bestTime = currentGame.timeElapsed;
                }
            }
        }
    }

    getGameStats() : any {
        return {
            totalGames : this.totalGames, 
            gamesWon : this.gamesWon, 
            bestTime : this.bestTime
        };
    }

    resetGameStats() : void {
        this.totalGames = 0; 
        this.gamesWon = 0;
        this.bestTime = null;
    }

    private games : GameObject[] = [];
    private totalGames : number = 0;
    private gamesWon : number  = 0;
    private bestTime : number = null;
}