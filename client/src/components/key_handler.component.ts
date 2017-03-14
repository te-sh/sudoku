import { Component, OnInit } from "@angular/core";

import { BoardService } from "services/board.service";
import { ModeService } from "services/mode.service";

@Component({
  selector: "sudoku-key-handler",
  template: ""
})
export class KeyHandlerComponent implements OnInit {
  constructor(
    private boardService: BoardService,
    private modeService: ModeService
  ) {
  }

  ngOnInit() {
    window.addEventListener("keydown", (key) => this.handleKey(key.keyCode));
  }

  private handleKey(code: number) {
    if (!this.modeService.edit) {
      return;
    }

    const deltas = [{ x: -1, y: 0 }, { x: 0, y: -1 }, { x: 1, y: 0 }, { x: 0, y: 1 }];
    if (code >= 37 && code <= 40) {
      this.moveCursor(deltas[code - 37]);
    }

    if (code >= 49 && code <= 57) {
      this.setValue(code - 49);
    }

    if (code >= 97 && code <= 105) {
      this.setValue(code - 97);
    }

    if (code === 110 || code === 190) {
      this.setValue(undefined);
    }
  }

  private moveCursor(d: { x: number, y: number }) {
    let ground = this.boardService.ground;
    let p = ground.indexToPos(this.modeService.cursor);
    p.col = (p.col + d.x + ground.cols) % ground.cols;
    p.row = (p.row + d.y + ground.rows) % ground.rows;
    this.modeService.setCursor(ground.posToIndex(p));
  }

  private setValue(value?: number) {
    this.boardService.setValue(value);
  }
}
