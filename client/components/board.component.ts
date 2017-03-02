import { Component, Input, AfterViewInit, ViewChild, ElementRef, OnChanges, SimpleChanges } from "@angular/core";

import { Board } from "models/board";
import { GraphService } from "services/graph.service";

@Component({
  selector: "sudoku-board",
  templateUrl: "board.component.html"
})
export class BoardComponent implements AfterViewInit, OnChanges {
  @Input() board: Board;
  @ViewChild("container") container: ElementRef;

  constructor(private graph: GraphService) {
  }

  ngAfterViewInit() {
    this.graph.init(this.container.nativeElement);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["board"]) {
      this.graph.initBoard(this.board);
    }
  }
}
