import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "@angular/material";
import { FlexLayoutModule } from "@angular/flex-layout";

import { BoardService } from "services/board.service";
import { GraphService } from "services/graph.service";

import { AppComponent } from "components/app.component";
import { ToolbarComponent } from "components/toolbar.component";
import { BoardComponent } from "components/board.component";
import { KeyHandlerComponent } from "components/key_handler.component";
import { DownloadDialogComponent } from "components/download_dialog.component";

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
    KeyHandlerComponent,
    DownloadDialogComponent
  ],
  providers: [
    BoardService,
    GraphService
  ],
  entryComponents: [
    DownloadDialogComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
