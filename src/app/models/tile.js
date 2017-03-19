"use strict";
var Tile = (function () {
    function Tile(x, y) {
        this.x = x;
        this.y = y;
        this.opened = false;
        this.nearbyMines = 0;
        this.isMine = false;
        this.flagged = false;
        this.doubt = false;
    }
    return Tile;
}());
exports.Tile = Tile;
//# sourceMappingURL=tile.js.map