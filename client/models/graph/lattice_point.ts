import { Board } from "models/board";
import { Size } from "models/graph/size";

export class LatticePoint {
  left: number;
  top: number;
  right: number;
  bottom: number;

  constructor(index: number, board: Board, size: Size) {
    let p = board.indexToPos(index);
    this.left = p.col * size.cell;
    this.top = p.row * size.cell;
    this.right = (p.col + 1) * size.cell;
    this.bottom = (p.row + 1) * size.cell;
  }
}
