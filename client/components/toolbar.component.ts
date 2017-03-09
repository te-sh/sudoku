import { Component, OnInit } from "@angular/core";
import { MdDialog } from "@angular/material";
import { Observable } from "rxjs";

import { BoardService } from "services/board.service";
import { ModeService } from "services/mode.service";
import { SolveService } from "services/solve.service";
import { DownloadDialogComponent } from "./download_dialog.component";
import { UploadDialogComponent } from "./upload_dialog.component";

@Component({
  selector: "sudoku-toolbar",
  templateUrl: "toolbar.component.html"
})
export class ToolbarComponent implements OnInit {
  editMode$: Observable<boolean>;

  constructor(
    private dialog: MdDialog,
    private boardService: BoardService,
    private modeService: ModeService,
    private solveService: SolveService
  ) {
  }

  ngOnInit() {
    this.editMode$ = this.modeService.edit$.distinctUntilChanged();
  }

  changeEditMode() {
    this.modeService.toggleEdit();
  }

  solve() {
    this.solveService.run();
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
