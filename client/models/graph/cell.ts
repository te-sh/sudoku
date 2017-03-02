import * as PIXI from "pixi.js";
import * as _ from "lodash";

import { Board, Cell } from "models/board";
import { Config } from "models/graph/config";
import { Size } from "models/graph/size";
import { GraphCand } from "models/graph/cand";
import { Utils } from "models/graph/utils";

export class GraphCell {
  container: PIXI.Container;
  frame: PIXI.Graphics;
  cands: GraphCand[];

  constructor(
    private board: Board,
    private cell: Cell,
    private config: Config,
    private size: Size
  ) {
    this.setContainer();
    this.setFrame();
    this.setCands();
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
    let config = this.config.cell.frame;
    let color = this.config.cell.frame.color!;
    let size = this.size.cell;
    this.frame = Utils.buildRect(config, color, size);
    this.container.addChild(this.frame);
  }

  private setCands() {
    let candsContainer = new PIXI.Container();
    candsContainer.width = this.size.cands.width;
    candsContainer.height = this.size.cands.height;

    let s = this.size.cell + this.config.cell.frame.width;
    candsContainer.x = (s - this.size.cands.width) / 2;
    candsContainer.y = (s - this.size.cands.height) / 2;

    this.cands = _.map(new Array(this.board.nc), (_, cand) => {
      return new GraphCand(this.board, cand, this.config, this.size)
    });

    this.cands.forEach(cand => candsContainer.addChild(cand.container));

    this.container.addChild(candsContainer);
  }
}
