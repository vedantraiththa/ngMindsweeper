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
var game_object_1 = require("../models/game-object");
var move_1 = require("../models/move");
var saved_games_service_1 = require("../services/saved-games.service");
var MineGameComponent = (function () {
    function MineGameComponent(savedGamesService) {
        this.savedGamesService = savedGamesService;
        // for progress bar
        this.progress = {
            current: 0,
            target: 100
        };
    }
    // open a cell
    MineGameComponent.prototype.flipTile = function (x, y, isReaction) {
        var selectedTile = this.gameObj.tiles[x][y];
        if (selectedTile.flagged || selectedTile.doubt) {
            // dont allow marked tiles to be clicked
            return;
        }
        // Record move
        if (!this.gameObj.rerun && !isReaction) {
            this.gameObj.moves.push(new move_1.Move(this.gameObj.timeElapsed, false, selectedTile));
        }
        selectedTile.opened = true;
        if (selectedTile.isMine) {
            // game over
            selectedTile.cssClass = "explodedMine";
            this.gameComplete();
        }
        else {
            selectedTile.cssClass = "class" + selectedTile.nearbyMines;
            this.gameObj.uncoveredTiles--;
            this.progress.current++;
            if (this.gameObj.uncoveredTiles === 0) {
                // game over
                this.gameComplete();
            }
            // if tile has 0 mines flip surrounding tiles
            if (selectedTile.nearbyMines === 0) {
                for (var i = x - 1; i <= x + 1; i++) {
                    for (var j = y - 1; j <= y + 1; j++) {
                        if (((i >= 0 && i < this.gameObj.rows) && (j >= 0 && j < this.gameObj.cols))
                            && ((i !== x) || (j !== y))) {
                            var thisTile = this.gameObj.tiles[i][j];
                            // open the tile only if its not opened
                            if (!thisTile.opened) {
                                this.flipTile(i, j, true);
                            }
                        }
                    }
                }
            }
        }
    };
    // flag a cell
    MineGameComponent.prototype.flagTile = function (x, y, $event) {
        var selectedTile = this.gameObj.tiles[x][y];
        // Record move
        if (!this.gameObj.rerun) {
            this.gameObj.moves.push(new move_1.Move(this.gameObj.timeElapsed, true, selectedTile));
        }
        if (!selectedTile.flagged) {
            selectedTile.flagged = true;
            selectedTile.cssClass = "flag";
        }
        else if (!selectedTile.doubt) {
            selectedTile.doubt = true;
            selectedTile.cssClass = "doubt";
        }
        else {
            selectedTile.flagged = false;
            selectedTile.doubt = false;
            selectedTile.cssClass = null;
        }
        if ($event) {
            $event.preventDefault();
        }
    };
    // run when game is started
    MineGameComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes.gameObj.currentValue) {
            // start timer
            clearInterval(this.timer);
            this.gameObj.timeElapsed = 0;
            this.timer = setInterval(function () { _this.gameObj.timeElapsed++; }, 1000);
            // set progress bar
            this.progress = {
                current: 0,
                target: this.gameObj.uncoveredTiles
            };
            if (changes.gameObj.currentValue.rerun) {
                // disable all controls
                // trigger all the moves
                this.timeoutIds = [];
                changes.gameObj.currentValue.moves.forEach(function (move, idx, arr) {
                    var id = setTimeout(function () {
                        if (move.isContextClick) {
                            _this.flagTile(move.tile.x, move.tile.y, null);
                        }
                        else {
                            _this.flipTile(move.tile.x, move.tile.y);
                        }
                    }, move.time * 1000);
                    _this.timeoutIds.push(id);
                    // set ending move
                    if (idx === arr.length - 1) {
                        id = setTimeout(function () { if (!_this.gameObj.isOver) {
                            _this.gameComplete();
                        } }, (move.time + 1) * 1000);
                        _this.timeoutIds.push(id);
                    }
                });
            }
        }
    };
    // run when game is over
    MineGameComponent.prototype.gameComplete = function () {
        this.gameObj.isOver = true;
        clearInterval(this.timer);
        // open all unexploded mines
        for (var i = 0; i < this.gameObj.rows; i++) {
            for (var j = 0; j < this.gameObj.cols; j++) {
                if (this.gameObj.tiles[i][j].isMine && !this.gameObj.tiles[i][j].opened) {
                    this.gameObj.tiles[i][j].cssClass = "unexplodedMine";
                }
            }
        }
        if (!this.gameObj.rerun) {
            // save game
            this.savedGamesService.addGame(this.gameObj);
        }
        else {
            this.timeoutIds.forEach(clearTimeout);
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', game_object_1.GameObject)
    ], MineGameComponent.prototype, "gameObj", void 0);
    MineGameComponent = __decorate([
        core_1.Component({
            selector: "mine-game",
            templateUrl: './app/templates/mine-game.html'
        }), 
        __metadata('design:paramtypes', [saved_games_service_1.SavedGamesService])
    ], MineGameComponent);
    return MineGameComponent;
}());
exports.MineGameComponent = MineGameComponent;
//# sourceMappingURL=mine-game.component.js.map