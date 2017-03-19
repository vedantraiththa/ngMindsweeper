export class Tile {
    opened : boolean;
    nearbyMines : number;
    isMine : boolean;
    flagged : boolean;
    doubt : boolean;
    cssClass : string;

    constructor(public x : number, public y : number) {
        this.opened = false;
        this.nearbyMines = 0;
        this.isMine = false;
        this.flagged = false;
        this.doubt = false;
    }
}