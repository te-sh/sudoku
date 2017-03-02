import { Component, Input, AfterViewInit, ViewChild, ElementRef } from "@angular/core";
import * as PIXI from "pixi.js";

import { Board } from "models/board";

@Component({
  selector: "sudoku-board",
  templateUrl: "board.component.html"
})
export class BoardComponent implements AfterViewInit {
  @Input() board: Board;
  @ViewChild("container") container: ElementRef;

  ngAfterViewInit() {
    let renderer = PIXI.autoDetectRenderer(100, 100);
    this.container.nativeElement.appendChild(renderer.view);
    let stage = new PIXI.Container();
    renderer.render(stage);
  }
}
