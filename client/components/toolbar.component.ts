import { Component, Input, Output, EventEmitter } from "@angular/core";
import { MdDialog } from "@angular/material";

import { BoardService } from "services/board.service";
import { DownloadDialogComponent } from "./download_dialog.component";
import { UploadDialogComponent } from "./upload_dialog.component";

@Component({
  selector: "sudoku-toolbar",
  templateUrl: "toolbar.component.html"
})
export class ToolbarComponent {
  @Input() editMode: boolean;
  @Output() editModeChange = new EventEmitter<boolean>();

  constructor(
    private boardService: BoardService,
    private dialog: MdDialog
  ) {
  }

  changeEditMode() {
    this.editMode = !this.editMode;
    this.editModeChange.emit(this.editMode);
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
