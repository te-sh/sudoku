import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import * as PIXI from "pixi.js";

import { Ground } from "models/board";
import { Cell } from "models/cell";
import { Result } from "models/result";
import { GraphBoard } from "models/graph/board";
import { BoardService } from "services/board.service";
import { ModeService } from "services/mode.service";

@Injectable()
export class GraphService {
  private renderer: PIXI.WebGLRenderer|PIXI.CanvasRenderer;
  private graphBoard: GraphBoard;

  private ground$: Observable<Ground>;
  private cells$: Observable<Cell[]>;
  private problems$: Observable<boolean[]>;
  private result$: Observable<Result>;
  private editMode$: Observable<boolean>;
  private cursor$: Observable<number>;

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
    this.ground$ = this.boardService.ground$.distinctUntilChanged();
    this.ground$.subscribe(ground => {
      this.graphBoard.initGround(ground);
      let size = this.graphBoard.size.board;
      this.renderer.resize(size.width, size.height);
      this.render();
    });

    this.cells$ = this.boardService.cells$.distinctUntilChanged();
    this.cells$.subscribe(cells => {
      this.graphBoard.updateCells(cells);
      this.graphBoard.setEditMode(this.modeService.edit);
      this.render();
    });

    this.problems$ = this.boardService.problems$.distinctUntilChanged();
    this.problems$.subscribe(problems => {
      this.graphBoard.updateProblems(problems);
      this.render();
    });

    this.result$ = this.boardService.result$.distinctUntilChanged();
    this.boardService.result$.subscribe(result => {
      this.graphBoard.updateResult(result);
      this.render();
    });

    this.editMode$ = this.modeService.edit$.distinctUntilChanged();
    this.editMode$.subscribe(edit => {
      this.graphBoard.setEditMode(edit);
      this.render();
    });

    this.cursor$ = this.modeService.cursor$;
    this.cursor$.subscribe(cursor => {
      this.graphBoard.setCursor(this.modeService.edit ? cursor : -1);
      this.render();
    });
  }

  private render() {
    this.renderer.render(this.graphBoard.stage);
  }
}
