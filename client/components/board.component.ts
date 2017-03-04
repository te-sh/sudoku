import { Component, Input, AfterViewInit, ViewChild, ElementRef } from "@angular/core";
import { Observable } from "rxjs";

import { Ground, Cell } from "models/board";
import { GraphService } from "services/graph.service";

@Component({
  selector: "sudoku-board",
  templateUrl: "board.component.html"
})
export class BoardComponent implements AfterViewInit {
  @Input() ground: Observable<Ground>;
  @Input() cells: Observable<Cell[]>;
  @Input() problems: Observable<boolean[]>;
  @ViewChild("container") container: ElementRef;

  constructor(private graphService: GraphService) {
  }

  ngAfterViewInit() {
    this.graphService.init(this.container.nativeElement);

    this.ground.subscribe(ground => {
      if (ground) {
        this.graphService.initGround(ground);
      }
    });

    this.cells.subscribe(cells => {
      if (cells) {
        this.graphService.updateCells(cells);
      }
    });

    this.problems.subscribe(problems => {
      if (problems) {
        this.graphService.updateProblems(problems);
      }
    });
  }
}
