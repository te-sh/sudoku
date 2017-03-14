import { Component, OnInit } from "@angular/core";
import { MdDialog } from "@angular/material";
import { Observable } from "rxjs";

import { BoardService } from "services/board.service";
import { ModeService } from "services/mode.service";
import { SolveService } from "services/solve.service";
import { HistoryService } from "services/history.service";
import { DownloadDialogComponent } from "./download_dialog.component";
import { UploadDialogComponent } from "./upload_dialog.component";

@Component({
  selector: "sudoku-toolbar",
  templateUrl: "toolbar.component.html"
})
export class ToolbarComponent implements OnInit {
  canForward$: Observable<boolean>;
  canStop$: Observable<boolean>;
  canBackward$: Observable<boolean>;

  constructor(
    private dialog: MdDialog,
    private boardService: BoardService,
    private modeService: ModeService,
    private solveService: SolveService,
    private historyService: HistoryService
  ) {
  }

  ngOnInit() {
    let edit$ = this.modeService.edit$.distinctUntilChanged();
    let solving$ = this.modeService.solving$.distinctUntilChanged();
    let historyIsEmpty$ = this.historyService.histories$
      .map(histories => histories.length === 0);

    this.canForward$ = Observable
      .combineLatest(edit$, solving$)
      .map(([edit, solving]) => !edit && !solving);
    this.canStop$ = Observable
      .combineLatest(edit$, solving$)
      .map(([edit, solving]) => !edit && solving);
    this.canBackward$ = Observable
      .combineLatest(edit$, solving$, historyIsEmpty$)
      .map(([edit, solving, historyIsEmpty]) => !edit && !solving && !historyIsEmpty);
  }

  changeEditMode() {
    this.modeService.toggleEdit();
  }

  stepForward() {
    this.solveService.forward();
  }

  play() {
    this.solveService.forward({
      solved: 3000,
      applied: 500
    });
  }

  forward() {
    this.solveService.forward({
      solved: 1000,
      applied: 200
    });
  }

  stop() {
    this.solveService.stop();
  }

  stepBackward() {
    this.solveService.stepBackward();
  }

  clear() {
    this.boardService.clear();
  }

  download() {
    let dialogRef = this.dialog.open(DownloadDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.boardService.download(result);
      }
    });
  }

  upload() {
    let dialogRef = this.dialog.open(UploadDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.boardService.upload(result);
      }
    });
  }
}
