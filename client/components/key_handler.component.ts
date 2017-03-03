import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";

import { Board } from "models/board";

@Component({
  selector: "sudoku-key-handler",
  template: ""
})
export class KeyHandlerComponent implements OnInit {
  @Input() board: Board;
  @Input() editMode: boolean;
  @Input() cursor: number;
  @Output() cursorChange = new EventEmitter<number>();

  ngOnInit() {
    window.addEventListener("keydown", (key) => {
      if (!this.editMode) {
        return;
      }

      switch (key.keyCode) {
      case 37:
        this.moveCursor(-1, 0);
        break;
      case 38:
        this.moveCursor(0, -1);
        break;
      case 39:
        this.moveCursor(1, 0);
        break;
      case 40:
        this.moveCursor(0, 1);
        break;
      }
    });
  }

  private moveCursor(dx: number, dy: number) {
    let p = this.board.indexToPos(this.cursor);
    p.col = (p.col + dx + this.board.cols) % this.board.cols;
    p.row = (p.row + dy + this.board.rows) % this.board.rows;
    this.cursor = this.board.posToIndex(p);
    this.cursorChange.emit(this.cursor);
  }
}
