import { Injectable } from "@angular/core";
import * as PIXI from "pixi.js";

import { Board } from "models/board";
import { ConfigService } from "services/config.service";

@Injectable()
export class GraphService {
  board: Board;

  private renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer;
  private stage: PIXI.Container;

  constructor(private config: ConfigService) {
    this.renderer = PIXI.autoDetectRenderer(100, 100);
    this.stage = new PIXI.Container();
    this.renderer.render(this.stage);
  }

  init(element: any) {
    element.appendChild(this.renderer.view);
  }

  initBoard(board: Board) {
    this.board = board;
  }

  get size() {
    let cand =
      this.config.cand.text.size +
      this.config.cand.padding * 2 +
      this.config.cand.frame.width;

    let cands =
      Math.ceil(Math.sqrt(this.board.nc)) * cand +
      this.config.cand.frame.width;

    let cell =
      cands +
      this.config.cell.padding * 2 +
      this.config.cell.frame.width;

    let board = {
      width: this.board.cols * cell + this.config.cell.frame.width,
      height: this.board.rows * cell + this.config.cell.frame.width
    };

    return { cand, cands, cell, board };
  }
}
