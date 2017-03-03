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

  constructor(private graphService: GraphService) {
  }

  ngAfterViewInit() {
    this.graphService.init(this.container.nativeElement);
  }

  ngOnChanges(changes: SimpleChanges) {
    let change = changes["board"];
    if (change) {
      if (this.board && change.previousValue !== change.currentValue) {
        this.graphService.initBoard(this.board);
      } else {
      }
    }
  }
}
