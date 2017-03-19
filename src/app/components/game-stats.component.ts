import { Component } from '@angular/core';
import { SavedGamesService } from "../services/saved-games.service";

@Component({
  selector: 'game-stats',
  templateUrl: './app/templates/game-stats.html',
})
export class GameStatsComponent {
    stats : any = {};

    refreshData() : void {
        this.stats = this.savedGamesService.getGameStats();
    }

    resetStats() : void {
        this.savedGamesService.resetGameStats();
        this.refreshData();
    }

    constructor(private savedGamesService: SavedGamesService) {
        this.refreshData();
    }
}