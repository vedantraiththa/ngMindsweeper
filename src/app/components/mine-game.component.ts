import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { GameObject } from "../models/game-object";
import { ToDigitalClockTimePipe } from './to-digital-clock-time.pipe';
import { Move } from "../models/move";
import { SavedGamesService } from "../services/saved-games.service";

@Component({
  selector: "mine-game",
  templateUrl: './app/templates/mine-game.html'
})
export class MineGameComponent implements OnChanges {
    @Input()
    gameObj : GameObject;

    timeoutIds : any[];

    // for progress bar
    progress : any = {
        current : 0,
        target : 100
    };

    timer : any;

    // open a cell
    flipTile(x: number, y :number, isReaction? : boolean): void {
        let selectedTile = this.gameObj.tiles[x][y];

        if (selectedTile.flagged || selectedTile.doubt) {
            // dont allow marked tiles to be clicked
            return;
        }

        // Record move
        if (!this.gameObj.rerun && !isReaction) {
            this.gameObj.moves.push(new Move(this.gameObj.timeElapsed, false, selectedTile));
        }

        selectedTile.opened = true;
        if (selectedTile.isMine) {
            // game over
            selectedTile.cssClass = "explodedMine";
            this.gameComplete();
        } else {
            selectedTile.cssClass = "class" + selectedTile.nearbyMines;
            this.gameObj.uncoveredTiles--;
            this.progress.current++;

            if (this.gameObj.uncoveredTiles === 0) {
                // game over
                this.gameComplete();
            }

            // if tile has 0 mines flip surrounding tiles
            if (selectedTile.nearbyMines === 0) {
                for (let i = x - 1; i <= x + 1; i++) {
                    for (let j = y - 1; j <= y + 1; j++) {
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
    }

    // flag a cell
    flagTile(x: number, y :number, $event: Event): void {
        let selectedTile = this.gameObj.tiles[x][y];

        // Record move
        if (!this.gameObj.rerun) {
            this.gameObj.moves.push(new Move(this.gameObj.timeElapsed, true, selectedTile));
        }

        if (!selectedTile.flagged) {
            selectedTile.flagged = true;
            selectedTile.cssClass = "flag";
        } else if (!selectedTile.doubt) {
            selectedTile.doubt = true;
            selectedTile.cssClass = "doubt";
        } else {
            selectedTile.flagged = false;
            selectedTile.doubt = false;
            selectedTile.cssClass = null;
        }

        if ($event) {
            $event.preventDefault();
        }
    }

    // run when game is started
    ngOnChanges(changes: any) : void {
        if (changes.gameObj.currentValue) {
            // start timer
            clearInterval(this.timer);
            this.gameObj.timeElapsed = 0;
            this.timer = setInterval(() => { this.gameObj.timeElapsed++; }, 1000);

            // set progress bar
            this.progress = {
                current : 0,
                target : this.gameObj.uncoveredTiles
            };

            if (changes.gameObj.currentValue.rerun) {
                // disable all controls
                // trigger all the moves
                this.timeoutIds = [];
                changes.gameObj.currentValue.moves.forEach((move: Move, idx: number, arr: any[]) => {
                    let id = setTimeout(() => {
                        if (move.isContextClick) {
                            this.flagTile(move.tile.x, move.tile.y, null);
                        } else {
                            this.flipTile(move.tile.x, move.tile.y);
                        }
                    }, move.time * 1000);
                    this.timeoutIds.push(id);

                    // set ending move
                    if (idx === arr.length - 1) {
                        id = setTimeout(() => { if (!this.gameObj.isOver) { this.gameComplete(); } }, (move.time + 1) * 1000);
                        this.timeoutIds.push(id);
                    }
                });
            }
        }
    }
    
    // run when game is over
    gameComplete(): void {
        this.gameObj.isOver = true;
        clearInterval(this.timer);

        // open all unexploded mines
        for (let i = 0; i < this.gameObj.rows; i++) {
            for (let j = 0; j < this.gameObj.cols; j++) {
                if (this.gameObj.tiles[i][j].isMine && !this.gameObj.tiles[i][j].opened) {
                    this.gameObj.tiles[i][j].cssClass = "unexplodedMine";
                }
            }
        }

        if (!this.gameObj.rerun) {
            // save game
            this.savedGamesService.addGame(this.gameObj);
        } else {
            this.timeoutIds.forEach(clearTimeout);
        }
    }

    constructor(private savedGamesService: SavedGamesService) { }
}