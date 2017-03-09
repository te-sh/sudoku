import { Injectable } from "@angular/core";
import * as PIXI from "pixi.js";

import { GraphBoard } from "models/graph/board";
import { BoardService } from "services/board.service";
import { ModeService } from "services/mode.service";

@Injectable()
export class GraphService {
  private renderer: PIXI.WebGLRenderer|PIXI.CanvasRenderer;
  private graphBoard: GraphBoard;

  constructor(
    private boardService: BoardService,
    private modeService: ModeService
  ) {
    this.renderer = PIXI.autoDetectRenderer(1, 1);
    this.renderer.backgroundColor = 0xffffff;
    this.graphBoard = new GraphBoard();
  }

  init(element: any) {
    element.appendChild(this.renderer.view);
    this.setUpdates();
    this.render();
  }

  private setUpdates() {
    this.boardService.ground$.subscribe(ground => {
      this.graphBoard.initGround(ground);
      let size = this.graphBoard.size.board;
      this.renderer.resize(size.width, size.height);
      this.render();
    });

    this.boardService.cells$.subscribe(cells => {
      this.graphBoard.updateCells(cells);
      this.graphBoard.setEditMode(this.modeService.edit);
      this.render();
    });

    this.boardService.problems$.subscribe(problems => {
      this.graphBoard.updateProblems(problems);
      this.render();
    });

    this.boardService.result$.subscribe(result => {
      this.graphBoard.updateResult(result);
      this.render();
    });

    this.modeService.edit$.subscribe(edit => {
      this.graphBoard.setEditMode(edit);
      this.render();
    });

    this.modeService.cursor$.subscribe(cursor => {
      this.graphBoard.setCursor(this.modeService.edit ? cursor : -1);
      this.render();
    });
  }

  private render() {
    this.renderer.render(this.graphBoard.stage);
  }
}
