import * as PIXI from "pixi.js";
import * as _ from "lodash";

import { Board, Cell } from "models/board";
import { Config } from "models/graph/config";
import { Size } from "models/graph/size";
import { GraphCand } from "models/graph/cand";
import { Utils } from "models/graph/utils";

export class GraphCell {
  container: PIXI.Container;

  private frame: PIXI.Graphics;
  private cursor: PIXI.Graphics;
  private candsContainer = new PIXI.Container();
  private cands: GraphCand[];

  constructor(
    private board: Board,
    private cell: Cell,
    private config: Config,
    private size: Size
  ) {
    this.setContainer();
    this.setFrameGraphics();
    this.setCursorGraphics();
    this.setCands();
  }

  setEditMode(editMode: boolean) {
    this.candsContainer.visible = !editMode && !!this.cell.cands;
  }

  setCursor(cursor: number) {
    this.cursor.visible = this.cell.index === cursor;
  }

  private setContainer() {
    this.container = new PIXI.Container();
    this.container.width = this.size.cell;
    this.container.height = this.size.cell;

    let p = this.board.indexToPos(this.cell.index);
    this.container.x = p.col * this.size.cell;
    this.container.y = p.row * this.size.cell;
  }

  private setFrameGraphics() {
    this.frame = Utils.buildRect(
      this.config.cell.frame,
      this.config.cell.frame.color!,
      this.size.cell
    );
    this.container.addChild(this.frame);
  }

  private setCursorGraphics() {
    this.cursor = Utils.buildRect(
      this.config.cell.cursor,
      this.config.cell.cursor.color!,
      this.size.cell
    );
    this.container.addChild(this.cursor);
  }

  private setCands() {
    this.candsContainer

    this.candsContainer.width = this.size.cands.width;
    this.candsContainer.height = this.size.cands.height;

    let s = this.size.cell + this.config.cell.frame.width;
    this.candsContainer.x = (s - this.size.cands.width) / 2;
    this.candsContainer.y = (s - this.size.cands.height) / 2;

    this.cands = _.map(new Array(this.board.nc), (_, cand) => new GraphCand(
      this.board, cand, this.config, this.size
    ));

    this.cands.forEach(cand => this.candsContainer.addChild(cand.container));

    this.container.addChild(this.candsContainer);
  }
}
