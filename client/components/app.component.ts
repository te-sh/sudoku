import { Component, OnInit } from "@angular/core";

import { BoardService } from "services/board.service";

@Component({
  selector: "sudoku",
  templateUrl: "app.component.html"
})
export class AppComponent implements OnInit {
  constructor(private boardService: BoardService) {
  }

  ngOnInit() {
    this.boardService.init();
  }
}
