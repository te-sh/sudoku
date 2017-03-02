import * as PIXI from "pixi.js";

import { Board } from "models/board";
import { Config } from "models/graph/config";
import { Size } from "models/graph/size";
import { Utils } from "models/graph/utils";

export class GraphCand {
  container: PIXI.Container;
  frame: PIXI.Graphics;
  text: PIXI.Text;

  constructor(
    private board: Board,
    private cand: number,
    private config: Config,
    private size: Size
  ) {
    this.setContainer();
    this.setFrame();
    this.setText();
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
    let config = this.config.cand.frame;
    let color = this.config.cand.frame.color!;
    let size = this.size.cand;
    this.frame = Utils.buildRect(config, color, size);
    this.container.addChild(this.frame);
  }

  private setText() {
    let cand = (this.cand + 1).toString()
    let config = this.config.cand.text;
    let color = this.config.cand.text.color!;
    let size = this.size.cand + this.config.cand.frame.width;
    this.text = Utils.buildText(cand, config, color, size);
    this.container.addChild(this.text);
  }
}
