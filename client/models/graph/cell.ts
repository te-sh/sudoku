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
    private config: Config,
    private cell: Cell,
    board: Board,
    size: Size
  ) {
    this.setContainer(board, size);
    this.setFrameGraphics(size);
    this.setCursorGraphics(size);
    this.setCands(board, size);
  }

  update() {
    if (this.cell.cands) {
      this.cands.forEach((cand, index) => {
        cand.setVisible(this.cell.has(index));
      });
    }
  }

  setEditMode(editMode: boolean) {
    this.candsContainer.visible = !editMode && !!this.cell.cands;
  }

  setCursor(cursor: number) {
    this.cursor.visible = this.cell.index === cursor;
  }

  private setContainer(board: Board, size: Size) {
    this.container = new PIXI.Container();
    this.container.width = size.cell;
    this.container.height = size.cell;

    let p = board.indexToPos(this.cell.index);
    this.container.x = p.col * size.cell;
    this.container.y = p.row * size.cell;
  }

  private setFrameGraphics(size: Size) {
    this.frame = Utils.buildRect(
      this.config.cell.frame,
      this.config.cell.frame.color!,
      size.cell
    );
    this.container.addChild(this.frame);
  }

  private setCursorGraphics(size: Size) {
    this.cursor = Utils.buildRect(
      this.config.cell.cursor,
      this.config.cell.cursor.color!,
      size.cell
    );
    this.container.addChild(this.cursor);
  }

  private setCands(board: Board, size: Size) {
    this.candsContainer

    this.candsContainer.width = size.cands.width;
    this.candsContainer.height = size.cands.height;

    let s = size.cell + this.config.cell.frame.width;
    this.candsContainer.x = (s - size.cands.width) / 2;
    this.candsContainer.y = (s - size.cands.height) / 2;

    this.cands = _.range(board.nc).map(cand => new GraphCand(
      this.config, cand, board, size
    ));

    this.cands.forEach(cand => this.candsContainer.addChild(cand.container));

    this.container.addChild(this.candsContainer);
  }
}
