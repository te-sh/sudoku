import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { MaterialModule } from "@angular/material";
import { FlexLayoutModule } from "@angular/flex-layout";

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
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
