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
    private config: Config,
    private cand: number,
    board: Board,
    size: Size
  ) {
    this.setContainer(board, size);
    this.setFrameGraphics(size);
    this.setTextGraphics(size);
  }

  setVisible(visible: boolean) {
    this.text.visible = visible;
  }

  private setContainer(board: Board, size: Size) {
    this.container = new PIXI.Container();
    this.container.width = size.cell;
    this.container.height = size.cell;

    let p = board.candIndexToPos(this.cand);
    this.container.x = p.col * size.cand;
    this.container.y = p.row * size.cand;
  }

  private setFrameGraphics(size: Size) {
    this.frame = Utils.buildRect(
      this.config.cand.frame,
      this.config.cand.frame.color!,
      size.cand
    );
    this.container.addChild(this.frame);
  }

  private setTextGraphics(size: Size) {
    this.text = Utils.buildText(
      (this.cand + 1).toString(),
      this.config.cand.text,
      this.config.cand.text.color!,
      size.cand + this.config.cand.frame.width
    );
    this.container.addChild(this.text);
  }
}
