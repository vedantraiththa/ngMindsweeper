"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var SavedGamesService = (function () {
    function SavedGamesService() {
        this.games = [];
        this.totalGames = 0;
        this.gamesWon = 0;
        this.bestTime = null;
    }
    SavedGamesService.prototype.getGames = function () {
        return Promise.resolve(this.games);
    };
    SavedGamesService.prototype.addGame = function (currentGame) {
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
    };
    SavedGamesService.prototype.getGameStats = function () {
        return {
            totalGames: this.totalGames,
            gamesWon: this.gamesWon,
            bestTime: this.bestTime
        };
    };
    SavedGamesService.prototype.resetGameStats = function () {
        this.totalGames = 0;
        this.gamesWon = 0;
        this.bestTime = null;
    };
    SavedGamesService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], SavedGamesService);
    return SavedGamesService;
}());
exports.SavedGamesService = SavedGamesService;
//# sourceMappingURL=saved-games.service.js.map