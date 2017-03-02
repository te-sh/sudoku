import * as PIXI from "pixi.js";

import { Board } from "models/board";
import { Config } from "models/graph/config";
import { Size } from "models/graph/size";
import { Utils } from "models/graph/utils";

export class GraphCand {
  container: PIXI.Container;
  frame: PIXI.Graphics;

  constructor(
    private board: Board,
    private cand: number,
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

    let p = this.board.candIndexToPos(this.cand);
    this.container.x = p.col * this.size.cand;
    this.container.y = p.row * this.size.cand;
  }

  private setFrame() {
    this.frame = Utils.buildFrame(this.config.cand.frame, this.size.cand);
    this.container.addChild(this.frame);
  }
}
