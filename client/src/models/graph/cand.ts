import * as PIXI from "pixi.js";
import * as _ from "lodash";

import { Ground } from "models/board";
import { Config } from "models/graph/config";
import { Size } from "models/graph/size";
import { Utils } from "models/graph/utils";

export class GraphCand {
  container: PIXI.Container;

  private frame: PIXI.Graphics;
  private text: PIXI.Text;
  private marks: { [key: string]: PIXI.Graphics };

  constructor(
    private config: Config,
    private cand: number,
    ground: Ground,
    size: Size
  ) {
    this.setContainer(ground, size);
    this.setFrameGraphics(size);
    this.setMarksGraphics(size);
    this.setTextGraphics(size);
  }

  setTextVisible(visible: boolean) {
    this.text.visible = visible;
  }

  setMarkVisible(mark: string, visible: boolean) {
    this.marks[mark].visible = visible;
  }

  private setContainer(ground: Ground, size: Size) {
    this.container = new PIXI.Container();
    this.container.width = size.cell;
    this.container.height = size.cell;

    let p = ground.candIndexToPos(this.cand);
    this.container.x = p.col * size.cand;
    this.container.y = p.row * size.cand;
  }

  private setFrameGraphics(size: Size) {
    let config = this.config.cand;
    this.frame = Utils.buildRect(config.frame, config.frame.color!, size.cand, true);
    this.container.addChild(this.frame);
  }

  private setMarksGraphics(size: Size) {
    let config = this.config.cand;
    let csize = size.cand + config.frame.width;
    this.marks = {
      remove: Utils.buildCirc(config.markCirc, config.markCirc.colors![0], csize),
      decide: Utils.buildCirc(config.markCirc, config.markCirc.colors![1], csize),
      mark1: Utils.buildRect(config.markRect, config.markRect.colors![0], size.cand),
      mark2: Utils.buildRect(config.markRect, config.markRect.colors![0], size.cand)
    };
    _.forEach(this.marks, g => this.container.addChild(g));
  }

  private setTextGraphics(size: Size) {
    let str = (this.cand + 1).toString();
    let config = this.config.cand;
    let csize = size.cand + config.frame.width;
    this.text = Utils.buildText(str, config.text, config.text.color!, csize);
    this.container.addChild(this.text);
  }
}
