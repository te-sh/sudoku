import { Component, OnInit } from "@angular/core";

import { BoardService } from "services/board.service";
import { GraphService } from "services/graph.service";

@Component({
  selector: "sudoku",
  templateUrl: "app.component.html"
})
export class AppComponent implements OnInit {
  editMode = false;
  cursor = 0;

  constructor(
    private boardService: BoardService,
    private graphService: GraphService
  ) {
  }

  ngOnInit() {
    this.boardService.init();
    this.graphService.setEditMode(this.editMode);
    this.graphService.setCursor(this.cursor);
  }

  setEditMode(editMode: boolean) {
    this.editMode = editMode;
    this.graphService.setEditMode(this.editMode);
  }

  setCursor(cursor: number) {
    this.cursor = cursor;
    this.graphService.setCursor(this.cursor);
  }
}
