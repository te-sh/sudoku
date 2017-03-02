import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { MaterialModule } from "@angular/material";
import { FlexLayoutModule } from "@angular/flex-layout";

import { BoardService } from "services/board.service";
import { GraphService } from "services/graph.service";
import { ConfigService } from "services/config.service";

import { AppComponent } from "components/app.component";
import { ToolbarComponent } from "components/toolbar.component";
import { BoardComponent } from "components/board.component";

@NgModule({
  imports: [
    BrowserModule,
    MaterialModule.forRoot(),
    FlexLayoutModule.forRoot()
  ],
  declarations: [
    AppComponent,
    ToolbarComponent,
    BoardComponent
  ],
  providers: [
    BoardService,
    GraphService,
    ConfigService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
