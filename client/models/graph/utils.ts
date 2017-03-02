import * as PIXI from "pixi.js";

import { ConfigRect } from "models/graph/config";

export class Utils {
  static buildFrame(config: ConfigRect, size: number) {
    let frame = new PIXI.Graphics();
    let width = config.width;

    frame.lineStyle(width, config.color!);
    frame.drawRect(width / 2, width / 2, size, size);

    return frame;
  }
}
