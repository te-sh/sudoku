import * as PIXI from "pixi.js";
import * as _ from "lodash";

import { Ground, Cell } from "models/board";
import { Config } from "models/graph/config";
import { Size } from "models/graph/size";
import { GraphCand } from "models/graph/cand";
import { Utils } from "models/graph/utils";

export class GraphCell {
  container: PIXI.Container;

  private cell: Cell;
  private frame: PIXI.Graphics;
  private texts: PIXI.Text[];
  private cursor: PIXI.Graphics;
  private candsContainer = new PIXI.Container();
  private cands: GraphCand[];

  constructor(
    private config: Config,
    index: number,
    ground: Ground,
    size: Size
  ) {
    this.setContainer(index, ground, size);
    this.setFrameGraphics(size);
    this.setTextGraphics(ground, size);
    this.setCursorGraphics(size);
    this.setCands(ground, size);
  }

  update(cell: Cell) {
    this.cell = cell;

    if (!_.isUndefined(this.cell.cands)) {
      this.texts.forEach(text => {
        text.visible = false;
      });
      this.cands.forEach((cand, index) => {
        cand.setVisible(this.cell.has(index));
      });
    }

    if (!_.isUndefined(this.cell.value)) {
      this.candsContainer.visible = false;

      this.texts.forEach((text, index) => {
        text.visible = this.cell.value == index;
      });
    }
  }

  setEditMode(editMode: boolean) {
    if (this.cell) {
      this.candsContainer.visible = !editMode && !!this.cell.cands;
    }
  }

  setCursor(cursor: number) {
    if (this.cell) {
      this.cursor.visible = this.cell.index === cursor;
    }
  }

  private setContainer(index: number, ground: Ground, size: Size) {
    this.container = new PIXI.Container();
    this.container.width = size.cell;
    this.container.height = size.cell;

    let p = ground.indexToPos(index);
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

  private setTextGraphics(ground: Ground, size: Size) {
    this.texts = _.times(ground.nc, index => Utils.buildText(
      (index + 1).toString(),
      this.config.cell.text,
      this.config.cell.text.colors![0],
      size.cell + this.config.cell.frame.width
    ));
    this.texts.forEach(text => this.container.addChild(text));
  }

  private setCursorGraphics(size: Size) {
    this.cursor = Utils.buildRect(
      this.config.cell.cursor,
      this.config.cell.cursor.color!,
      size.cell
    );
    this.container.addChild(this.cursor);
  }

  private setCands(ground: Ground, size: Size) {
    this.candsContainer

    this.candsContainer.width = size.cands.width;
    this.candsContainer.height = size.cands.height;

    let s = size.cell + this.config.cell.frame.width;
    this.candsContainer.x = (s - size.cands.width) / 2;
    this.candsContainer.y = (s - size.cands.height) / 2;

    this.cands = _.times(ground.nc, cand => new GraphCand(
      this.config, cand, ground, size
    ));

    this.cands.forEach(cand => this.candsContainer.addChild(cand.container));

    this.container.addChild(this.candsContainer);
  }
}
