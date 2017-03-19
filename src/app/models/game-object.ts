import { Optional } from '@angular/core';
import { Move } from "./move";
import { Tile } from "./tile";

export class GameObject {
    gameId : number;
    tiles : Tile[][];
    rerun : boolean;
    uncoveredTiles : number;
    isOver : boolean;
    timeElapsed : number;
    moves : Move[];

    resetGame() : void {
        this.isOver = false;
        this.rerun = true;
        this.timeElapsed = 0;
        this.uncoveredTiles = (this.rows * this.cols) - this.mines;

        for (let tileRow of this.tiles) {
            for (let tile of tileRow) {
                tile.opened = false;
                tile.doubt = false;
                tile.flagged = false;
                tile.cssClass = null;
            }
        }
    }

    constructor(public rows: number, public cols: number, public mines: number) {
        this.gameId = Date.now();
        this.uncoveredTiles = (this.rows * this.cols) - this.mines;
        this.isOver = false;
        this.timeElapsed = null;
        this.moves = [];

        // initialize tiles
        this.tiles = Array(this.rows);
        for (let i = 0; i < this.rows; i++) {
            this.tiles[i] = Array(this.cols);
            for (let j = 0; j < this.cols; j++) {
                this.tiles[i][j] = new Tile(i, j);
            }
        }

        // plant mines
        let mineCount = 0;
        while (mineCount < this.mines) {
            let x = Math.floor(Math.random() * this.rows);
            let y = Math.floor(Math.random() * this.cols);
            if (!this.tiles[x][y].isMine) {
                this.tiles[x][y].isMine = true;
                mineCount++;

                // set adjoining values
                for (let i = x - 1; i <= x + 1; i++) {
                    for (let j = y - 1; j <= y + 1; j++) {
                        if (((i >= 0 && i < this.rows) && (j >= 0 && j < this.cols)) 
                                && ((i !== x) || (j !== y))) {
                            this.tiles[i][j].nearbyMines++;
                        }
                    }
                }
            }
        }
    }
}