import { Component, OnInit } from "@angular/core";
import { MdDialog } from "@angular/material";
import { Observable } from "rxjs";

import { BoardService } from "services/board.service";
import { ModeService } from "services/mode.service";
import { SolveNavService } from "services/solve_nav.service";
import { HistoryService } from "services/history.service";
import { DownloadDialogComponent } from "./download_dialog.component";
import { UploadDialogComponent } from "./upload_dialog.component";

@Component({
  selector: "sudoku-toolbar",
  templateUrl: "toolbar.component.html"
})
export class ToolbarComponent implements OnInit {
  canEdit$: Observable<boolean>;
  canForward$: Observable<boolean>;
  canStop$: Observable<boolean>;
  canBackward$: Observable<boolean>;
  canManipBoard$: Observable<boolean>;

  constructor(
    private dialog: MdDialog,
    private boardService: BoardService,
    private modeService: ModeService,
    private solveNavService: SolveNavService,
    private historyService: HistoryService
  ) {
  }

  ngOnInit() {
    let edit$ = this.modeService.edit$.distinctUntilChanged();
    let solving$ = this.modeService.solving$.distinctUntilChanged();
    let historyIsEmpty$ = this.historyService.histories$
      .map(histories => histories.length === 0);

    this.canEdit$ = solving$.map(solving => !solving);
    this.canForward$ = Observable
      .combineLatest(edit$, solving$)
      .map(([edit, solving]) => !edit && !solving);
    this.canStop$ = Observable
      .combineLatest(edit$, solving$)
      .map(([edit, solving]) => !edit && solving);
    this.canBackward$ = Observable
      .combineLatest(edit$, solving$, historyIsEmpty$)
      .map(([edit, solving, historyIsEmpty]) => !edit && !solving && !historyIsEmpty);
    this.canManipBoard$ = Observable
      .combineLatest(edit$, solving$)
      .map(([edit, solving]) => !edit && !solving);
  }

  changeEditMode() {
    this.modeService.toggleEdit();
  }

  stepForward() {
    this.solveNavService.forward();
  }

  play() {
    this.solveNavService.forward({
      solved: 2500,
      applied: 500
    });
  }

  forward() {
    this.solveNavService.forward({
      solved: 500,
      applied: 150
    });
  }

  stop() {
    this.solveNavService.stop();
  }

  stepBackward() {
    this.solveNavService.historyBack();
  }

  fastBackward() {
    this.solveNavService.historyBackToFirst();
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
