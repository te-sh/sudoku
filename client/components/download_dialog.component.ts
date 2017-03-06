import { Component } from "@angular/core";
import { MdDialogRef } from "@angular/material";

@Component({
  selector: "download-dialog",
  templateUrl: "download_dialog.component.html"
})
export class DownloadDialogComponent {
  fileName = "sudoku.dat";

  constructor(public dialogRef: MdDialogRef<DownloadDialogComponent>) {
  }
}
