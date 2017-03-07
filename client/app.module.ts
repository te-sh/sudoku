import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "@angular/material";
import { FlexLayoutModule } from "@angular/flex-layout";

import { BoardService } from "services/board.service";
import { ModeService } from "services/mode.service";
import { GraphService } from "services/graph.service";
import { SolveService } from "services/solve.service";

import { AppComponent } from "components/app.component";
import { ToolbarComponent } from "components/toolbar.component";
import { BoardComponent } from "components/board.component";
import { SolversComponent } from "components/solvers.component";
import { KeyHandlerComponent } from "components/key_handler.component";
import { DownloadDialogComponent } from "components/download_dialog.component";
import { UploadDialogComponent } from "components/upload_dialog.component";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    MaterialModule.forRoot(),
    FlexLayoutModule.forRoot()
  ],
  declarations: [
    AppComponent,
    ToolbarComponent,
    BoardComponent,
    SolversComponent,
    KeyHandlerComponent,
    DownloadDialogComponent,
    UploadDialogComponent
  ],
  providers: [
    BoardService,
    ModeService,
    GraphService,
    SolveService
  ],
  entryComponents: [
    DownloadDialogComponent,
    UploadDialogComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
