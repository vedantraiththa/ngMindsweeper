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
var PastGamesComponent = (function () {
    function PastGamesComponent(savedGamesService) {
        this.savedGamesService = savedGamesService;
        this.startGame = new core_1.EventEmitter();
        this.savedGames = [];
        this.opened = false;
        this.fetchGames();
    }
    PastGamesComponent.prototype.fetchGames = function () {
        var _this = this;
        // set game options
        this.savedGamesService.getGames().then(function (games) { return _this.savedGames = games; });
    };
    PastGamesComponent.prototype.requestStartGame = function (gameObj) {
        // close dropdown
        this.opened = false;
        this.startGame.emit(gameObj);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], PastGamesComponent.prototype, "controlsDisabled", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], PastGamesComponent.prototype, "startGame", void 0);
    PastGamesComponent = __decorate([
        core_1.Component({
            selector: 'past-games',
            templateUrl: './app/templates/past-games.html'
        }), 
        __metadata('design:paramtypes', [saved_games_service_1.SavedGamesService])
    ], PastGamesComponent);
    return PastGamesComponent;
}());
exports.PastGamesComponent = PastGamesComponent;
//# sourceMappingURL=past-games.component.js.map