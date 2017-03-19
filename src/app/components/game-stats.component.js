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
var saved_games_service_1 = require("../services/saved-games.service");
var GameStatsComponent = (function () {
    function GameStatsComponent(savedGamesService) {
        this.savedGamesService = savedGamesService;
        this.stats = {};
        this.refreshData();
    }
    GameStatsComponent.prototype.refreshData = function () {
        this.stats = this.savedGamesService.getGameStats();
    };
    GameStatsComponent.prototype.resetStats = function () {
        this.savedGamesService.resetGameStats();
        this.refreshData();
    };
    GameStatsComponent = __decorate([
        core_1.Component({
            selector: 'game-stats',
            templateUrl: './app/templates/game-stats.html',
        }), 
        __metadata('design:paramtypes', [saved_games_service_1.SavedGamesService])
    ], GameStatsComponent);
    return GameStatsComponent;
}());
exports.GameStatsComponent = GameStatsComponent;
//# sourceMappingURL=game-stats.component.js.map