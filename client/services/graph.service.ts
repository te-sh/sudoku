import * as PIXI from "pixi.js";

import { Board } from "models/board";
import { GraphBoard } from "models/graph/board";

export class GraphService {
  private renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer;
  private graphBoard: GraphBoard;

  constructor() {
    this.renderer = PIXI.autoDetectRenderer(1, 1);
    this.renderer.backgroundColor = 0xffffff;
    this.graphBoard = new GraphBoard();
  }

  init(element: any) {
    element.appendChild(this.renderer.view);
    this.render();
  }

  initBoard(board: Board) {
    this.graphBoard.initBoard(board);
    let size = this.graphBoard.size.board;
    this.renderer.resize(size.width, size.height);
    this.render();
  }

  private render() {
    this.renderer.render(this.graphBoard.stage);
  }
}
