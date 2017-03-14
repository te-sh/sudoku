import { Component, AfterViewInit, ViewChild, ElementRef } from "@angular/core";

import { GraphService } from "services/graph.service";

@Component({
  selector: "sudoku-board",
  templateUrl: "board.component.html"
})
export class BoardComponent implements AfterViewInit {
  @ViewChild("container") container: ElementRef;

  constructor(private graphService: GraphService) {
  }

  ngAfterViewInit() {
    this.graphService.init(this.container.nativeElement);
  }
}
