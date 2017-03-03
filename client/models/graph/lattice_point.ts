import { Ground } from "models/board";
import { Size } from "models/graph/size";

export class LatticePoint {
  left: number;
  top: number;
  right: number;
  bottom: number;

  constructor(index: number, ground: Ground, size: Size) {
    let p = ground.indexToPos(index);
    this.left = p.col * size.cell;
    this.top = p.row * size.cell;
    this.right = (p.col + 1) * size.cell;
    this.bottom = (p.row + 1) * size.cell;
  }
}
