"use strict";
var tile_1 = require("./tile");
var GameObject = (function () {
    function GameObject(rows, cols, mines) {
        this.rows = rows;
        this.cols = cols;
        this.mines = mines;
        this.gameId = Date.now();
        this.uncoveredTiles = (this.rows * this.cols) - this.mines;
        this.isOver = false;
        this.timeElapsed = null;
        this.moves = [];
        // initialize tiles
        this.tiles = Array(this.rows);
        for (var i = 0; i < this.rows; i++) {
            this.tiles[i] = Array(this.cols);
            for (var j = 0; j < this.cols; j++) {
                this.tiles[i][j] = new tile_1.Tile(i, j);
            }
        }
        // plant mines
        var mineCount = 0;
        while (mineCount < this.mines) {
            var x = Math.floor(Math.random() * this.rows);
            var y = Math.floor(Math.random() * this.cols);
            if (!this.tiles[x][y].isMine) {
                this.tiles[x][y].isMine = true;
                mineCount++;
                // set adjoining values
                for (var i = x - 1; i <= x + 1; i++) {
                    for (var j = y - 1; j <= y + 1; j++) {
                        if (((i >= 0 && i < this.rows) && (j >= 0 && j < this.cols))
                            && ((i !== x) || (j !== y))) {
                            this.tiles[i][j].nearbyMines++;
                        }
                    }
                }
            }
        }
    }
    GameObject.prototype.resetGame = function () {
        this.isOver = false;
        this.rerun = true;
        this.timeElapsed = 0;
        this.uncoveredTiles = (this.rows * this.cols) - this.mines;
        for (var _i = 0, _a = this.tiles; _i < _a.length; _i++) {
            var tileRow = _a[_i];
            for (var _b = 0, tileRow_1 = tileRow; _b < tileRow_1.length; _b++) {
                var tile = tileRow_1[_b];
                tile.opened = false;
                tile.doubt = false;
                tile.flagged = false;
                tile.cssClass = null;
            }
        }
    };
    return GameObject;
}());
exports.GameObject = GameObject;
//# sourceMappingURL=game-object.js.map