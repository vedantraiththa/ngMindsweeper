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
var game_options_1 = require("../models/game-options");
var NewGameControlsComponent = (function () {
    function NewGameControlsComponent() {
        this.startGame = new core_1.EventEmitter();
        this.customGameOpts = new game_options_1.GameOptions(null, null, null);
        this.opened = false;
    }
    NewGameControlsComponent.prototype.setGame = function (difficultyLevel) {
        // close menu
        this.opened = false;
        // hide custom controls
        this.showCustomControls = false;
        // set game options
        var currentGameOpts;
        switch (difficultyLevel) {
            case 1:
                currentGameOpts = new game_options_1.GameOptions(5, 5, 5);
                break;
            case 2:
                currentGameOpts = new game_options_1.GameOptions(10, 7, 15);
                break;
            case 3:
                currentGameOpts = new game_options_1.GameOptions(12, 12, 25);
                break;
            case -1:
                currentGameOpts = this.customGameOpts;
                break;
            default:
                return;
        }
        // init game
        this.startGame.emit(currentGameOpts);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], NewGameControlsComponent.prototype, "controlsDisabled", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], NewGameControlsComponent.prototype, "startGame", void 0);
    NewGameControlsComponent = __decorate([
        core_1.Component({
            selector: 'new-game-controls',
            templateUrl: './app/templates/new-game-controls.html',
        }), 
        __metadata('design:paramtypes', [])
    ], NewGameControlsComponent);
    return NewGameControlsComponent;
}());
exports.NewGameControlsComponent = NewGameControlsComponent;
//# sourceMappingURL=new-game-controls.component.js.map