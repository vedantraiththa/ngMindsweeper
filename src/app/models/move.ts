import { Tile } from "./tile";

export class Move {
    constructor(public time: number, public isContextClick: boolean, public tile: Tile) { }
}