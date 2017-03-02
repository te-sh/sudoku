import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import * as WebFont from "webfontloader";

import { AppModule } from "../app.module";

export function main() {
  return platformBrowserDynamic().bootstrapModule(AppModule);
}

WebFont.load({
  google: {
    families: ["Tinos", "Play"]
  },
  active: main
});
