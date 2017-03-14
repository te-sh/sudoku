import * as PIXI from "pixi.js";
import * as _ from "lodash";

import { Ground } from "models/board";
import { Cell } from "models/cell";
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
  private graphCands: GraphCand[];

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
      this.graphCands.forEach((graphCand, index) => {
        graphCand.setTextVisible(this.cell.has(index));
      });
    }

    if (!_.isUndefined(this.cell.value)) {
      this.candsContainer.visible = false;

      this.texts.forEach((text, index) => {
        text.visible = this.cell.value === index;
      });
    }
  }

  updateProblem(problem: boolean) {
    let color = this.config.cell.text.colors![problem ? 0 : 1];
    this.texts.forEach(text => {
      text.style.fill = color;
    });
  }

  updateCandResult(mark: string, cell: Cell) {
    this.graphCands.forEach((graphCand, index) => {
      graphCand.setMarkVisible(mark, cell.has(index) || cell.value === index);
    });
  }

  removeResult() {
    this.graphCands.forEach(graphCand => {
      graphCand.setMarkVisible("remove", false);
    });
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
    this.texts.forEach(text => {
      this.container.addChild(text);
    });
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

    this.graphCands = _.times(ground.nc, cand => new GraphCand(
      this.config, cand, ground, size
    ));

    this.graphCands.forEach(graphCand => {
      this.candsContainer.addChild(graphCand.container);
    });

    this.container.addChild(this.candsContainer);
  }
}
