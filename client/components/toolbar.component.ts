import { Component, OnInit } from "@angular/core";
import { MdDialog } from "@angular/material";
import { Observable } from "rxjs";

import { BoardService } from "services/board.service";
import { ModeService } from "services/mode.service";
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
    private modeService: ModeService
  ) {
  }

  ngOnInit() {
    this.editMode$ = this.modeService.edit$;
  }

  changeEditMode() {
    this.modeService.toggleEdit();
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
