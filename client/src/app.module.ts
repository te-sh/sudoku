import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";
import {
  MdButtonModule, MdButtonToggleModule, MdCardModule, MdDialogModule,
  MdIconModule, MdInputModule, MdToolbarModule, MdIconRegistry
} from "@angular/material";
import { FlexLayoutModule } from "@angular/flex-layout";

import { BoardService } from "services/board.service";
import { ModeService } from "services/mode.service";
import { GraphService } from "services/graph.service";
import { SolversService } from "services/solvers.service";
import { SolveNavService } from "services/solve_nav.service";
import { SolveService } from "services/solve.service";
import { StoreService } from "services/store.service";
import { HistoryService } from "services/history.service";

import { AppComponent } from "components/app.component";
import { ToolbarComponent } from "components/toolbar.component";
import { BoardComponent } from "components/board.component";
import { SolversComponent } from "components/solvers.component";
import { KeyHandlerComponent } from "components/key_handler.component";
import { DownloadDialogComponent } from "components/download_dialog.component";
import { UploadDialogComponent } from "components/upload_dialog.component";

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    MdButtonModule,
    MdButtonToggleModule,
    MdCardModule,
    MdDialogModule,
    MdIconModule,
    MdInputModule,
    MdToolbarModule,
    FlexLayoutModule
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
    SolversService,
    SolveNavService,
    SolveService,
    StoreService,
    HistoryService
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
  constructor(mdIconRegistry: MdIconRegistry) {
    mdIconRegistry.registerFontClassAlias("fontawesome", "fa");
  }
}
