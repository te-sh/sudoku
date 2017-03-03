import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { MaterialModule } from "@angular/material";
import { FlexLayoutModule } from "@angular/flex-layout";

import { BoardService } from "services/board.service";
import { GraphService } from "services/graph.service";

import { AppComponent } from "components/app.component";
import { ToolbarComponent } from "components/toolbar.component";
import { BoardComponent } from "components/board.component";
import { KeyHandlerComponent } from "components/key_handler.component";

@NgModule({
  imports: [
    BrowserModule,
    MaterialModule.forRoot(),
    FlexLayoutModule.forRoot()
  ],
  declarations: [
    AppComponent,
    ToolbarComponent,
    BoardComponent,
    KeyHandlerComponent
  ],
  providers: [
    BoardService,
    GraphService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
