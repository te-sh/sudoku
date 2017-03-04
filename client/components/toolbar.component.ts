import { Component, Input, Output, EventEmitter } from "@angular/core";

import { BoardService } from "services/board.service";

@Component({
  selector: "sudoku-toolbar",
  templateUrl: "toolbar.component.html"
})
export class ToolbarComponent {
  @Input() editMode: boolean;
  @Output() editModeChange = new EventEmitter<boolean>();

  constructor(private boardService: BoardService) {
  }

  changeEditMode() {
    this.editMode = !this.editMode;
    this.editModeChange.emit(this.editMode);
  }

  clear() {
    this.boardService.clear();
  }
}
