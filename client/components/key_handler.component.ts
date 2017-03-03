import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";

import { Ground } from "models/board";
import { BoardService } from "services/board.service";

@Component({
  selector: "sudoku-key-handler",
  template: ""
})
export class KeyHandlerComponent implements OnInit {
  @Input() ground: Ground;
  @Input() editMode: boolean;
  @Input() cursor: number;
  @Output() cursorChange = new EventEmitter<number>();

  constructor(private boardService: BoardService) {
  }

  ngOnInit() {
    window.addEventListener("keydown", (key) => this.handleKey(key.keyCode));
  }

  private handleKey(code: number) {
    if (!this.editMode) {
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
    let p = this.ground.indexToPos(this.cursor);
    p.col = (p.col + d.x + this.ground.cols) % this.ground.cols;
    p.row = (p.row + d.y + this.ground.rows) % this.ground.rows;
    this.cursor = this.ground.posToIndex(p);
    this.cursorChange.emit(this.cursor);
  }

  private setValue(value?: number) {
    this.boardService.setValue(this.cursor, value);
  }
}
