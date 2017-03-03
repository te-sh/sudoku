import * as PIXI from "pixi.js";

import { Ground, Cell } from "models/board";
import { GraphBoard } from "models/graph/board";

export class GraphService {
  private renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer;
  private graphBoard: GraphBoard;
  private editMode: boolean;
  private cursor: number;

  constructor() {
    this.renderer = PIXI.autoDetectRenderer(1, 1);
    this.renderer.backgroundColor = 0xffffff;
    this.graphBoard = new GraphBoard();
  }

  init(element: any) {
    element.appendChild(this.renderer.view);
    this.render();
  }

  initGround(ground: Ground) {
    if (!ground) {
      return;
    }

    this.graphBoard.initGround(ground);
    let size = this.graphBoard.size.board;
    this.renderer.resize(size.width, size.height);
    this.render();
  }

  updateCells(cells: Cell[]) {
    if (!cells) {
      return;
    }

    this.graphBoard.updateCells(cells);
    this.setEditMode(this.editMode, false);
    this.render();
  }

  setEditMode(editMode: boolean, render = true) {
    this.editMode = editMode;
    this.graphBoard.setEditMode(editMode);
    this.setCursor(this.cursor, false);
    if (render) {
      this.render();
    }
  }

  setCursor(cursor: number, render = true) {
    this.cursor = cursor;
    this.graphBoard.setCursor(this.editMode ? cursor : -1);
    if (render) {
      this.render();
    }
  }

  private render() {
    this.renderer.render(this.graphBoard.stage);
  }
}
