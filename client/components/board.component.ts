import { Component, Input, AfterViewInit, ViewChild, ElementRef, OnChanges, SimpleChanges } from "@angular/core";

import { Ground, Cell } from "models/board";
import { GraphService } from "services/graph.service";

@Component({
  selector: "sudoku-board",
  templateUrl: "board.component.html"
})
export class BoardComponent implements AfterViewInit, OnChanges {
  @Input() ground: Ground;
  @Input() cells: Cell[];
  @ViewChild("container") container: ElementRef;

  constructor(private graphService: GraphService) {
  }

  ngAfterViewInit() {
    this.graphService.init(this.container.nativeElement);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["ground"]) {
      this.graphService.initGround(this.ground);
    }
    if (changes["cells"]) {
      this.graphService.updateCells(this.cells);
    }
  }
}
