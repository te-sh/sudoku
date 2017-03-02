import { Component, Input, OnInit, AfterViewInit, ViewChild, ElementRef } from "@angular/core";
import * as PIXI from "pixi.js";

import { Board } from "models/board";

@Component({
  selector: "sudoku-board",
  templateUrl: "board.component.html"
})
export class BoardComponent implements OnInit, AfterViewInit {
  @Input() board: Board;
  @ViewChild("container") container: ElementRef;

  private renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer;

  ngOnInit() {
    this.renderer = PIXI.autoDetectRenderer(100, 100);
  }

  ngAfterViewInit() {
    this.container.nativeElement.appendChild(this.renderer.view);
    let stage = new PIXI.Container();
    this.renderer.render(stage);
  }
}
