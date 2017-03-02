import * as PIXI from "pixi.js";

import { Board, Cell } from "models/board";
import { Config } from "models/graph/config";
import { Size } from "models/graph/size";

export class GraphCell {
  container: PIXI.Container;
  frame: PIXI.Graphics;

  constructor(
    private board: Board,
    private cell: Cell,
    private config: Config,
    private size: Size
  ) {
    this.setContainer();
    this.setFrame();
  }

  private setContainer() {
    this.container = new PIXI.Container();
    this.container.width = this.size.cell;
    this.container.height = this.size.cell;

    let p = this.board.indexToPos(this.cell.index);
    this.container.x = p.col * this.size.cell;
    this.container.y = p.row * this.size.cell;
  }

  private setFrame() {
    this.frame = new PIXI.Graphics();

    this.frame.lineStyle(
      this.config.cell.frame.width,
      this.config.cell.frame.color!
    );
    this.frame.drawRect(
      this.config.cell.frame.width / 2,
      this.config.cell.frame.width / 2,
      this.size.cell,
      this.size.cell
    );

    this.container.addChild(this.frame);
  }
}
