import { Injectable } from "@angular/core";
import * as PIXI from "pixi.js";
import * as _ from "lodash";

import { Board } from "models/board";
import { Config } from "models/graph/config";
import { Size } from "models/graph/size";
import { GraphCell } from "models/graph/cell";

@Injectable()
export class GraphService {
  board: Board;
  config: Config;

  private renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer;
  private stage: PIXI.Container;
  private cells: GraphCell[];

  constructor() {
    this.config = new Config();
    this.renderer = PIXI.autoDetectRenderer(1, 1);
    this.renderer.backgroundColor = 0xffffff;
    this.stage = new PIXI.Container();
    this.renderer.render(this.stage);
  }

  init(element: any) {
    element.appendChild(this.renderer.view);
    this.renderer.render(this.stage);
  }

  initBoard(board: Board) {
    this.board = board;
    let size = new Size(this.board, this.config);
    this.renderer.resize(size.board.width, size.board.height);

    this.cells = _.map(this.board.cells, cell => {
      return new GraphCell(this.board, cell, this.config, size);
    });
    this.cells.forEach(cell => this.stage.addChild(cell.container));

    this.renderer.render(this.stage);
  }
}
