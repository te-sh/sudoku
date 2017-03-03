import * as PIXI from "pixi.js";

import { Board } from "models/board";
import { Config } from "models/graph/config";
import { Size } from "models/graph/size";
import { Utils } from "models/graph/utils";

export class GraphCand {
  container: PIXI.Container;

  private frame: PIXI.Graphics;
  private text: PIXI.Text;

  constructor(
    private board: Board,
    private cand: number,
    private config: Config,
    private size: Size
  ) {
    this.setContainer();
    this.setFrameGraphics();
    this.setTextGraphics();
  }

  private setContainer() {
    this.container = new PIXI.Container();
    this.container.width = this.size.cell;
    this.container.height = this.size.cell;

    let p = this.board.candIndexToPos(this.cand);
    this.container.x = p.col * this.size.cand;
    this.container.y = p.row * this.size.cand;
  }

  private setFrameGraphics() {
    this.frame = Utils.buildRect(
      this.config.cand.frame,
      this.config.cand.frame.color!,
      this.size.cand
    );
    this.container.addChild(this.frame);
  }

  private setTextGraphics() {
    this.text = Utils.buildText(
      (this.cand + 1).toString(),
      this.config.cand.text,
      this.config.cand.text.color!,
      this.size.cand + this.config.cand.frame.width
    );
    this.container.addChild(this.text);
  }
}
