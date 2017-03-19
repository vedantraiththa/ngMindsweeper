import { Move } from "./move";

export class GameOptions {

  constructor(public rows: number, public cols: number, public mines: number, public moves?: Move[]) { }
}