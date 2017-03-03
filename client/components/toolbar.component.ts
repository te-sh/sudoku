import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "sudoku-toolbar",
  templateUrl: "toolbar.component.html"
})
export class ToolbarComponent {
  @Input() editMode: boolean;
  @Output() editModeChange = new EventEmitter<boolean>();

  changeEditMode() {
    this.editMode = !this.editMode;
    this.editModeChange.emit(this.editMode);
  }
}
