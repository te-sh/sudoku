import { Component } from "@angular/core";
import { MdDialogRef } from "@angular/material";

@Component({
  selector: "upload-dialog",
  templateUrl: "upload_dialog.component.html",
  styles: [require("styles/dialog.scss")]
})
export class UploadDialogComponent {
  file: File;

  constructor(public dialogRef: MdDialogRef<UploadDialogComponent>) {
  }
}
