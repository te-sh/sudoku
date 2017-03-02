import { Board } from "models/board";
import { Config } from "models/graph/config";

export class Size {
  cand: number;
  cands: { width: number, height: number };
  cell: number;
  board: { width: number, height: number };

  constructor(board: Board, config: Config) {
    let border = {
      cand: config.cand.frame.width,
      cell: config.cell.frame.width
    };

    let padding = {
      cand: config.cand.padding,
      cell: config.cell.padding
    };

    this.cand = config.cand.text.size + padding.cand * 2 + border.cand;

    this.cands = {
      width: Math.ceil(Math.sqrt(board.nc)) * this.cand + border.cand,
      height: Math.floor(Math.sqrt(board.nc)) * this.cand + border.cand
    };

    this.cell = this.cands.width + padding.cell * 2 + border.cell;

    this.board = {
      width: board.cols * this.cell + border.cell,
      height: board.rows * this.cell + border.cell
    };
  }
}
