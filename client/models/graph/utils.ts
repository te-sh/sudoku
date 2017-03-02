import * as PIXI from "pixi.js";

import { ConfigRect, ConfigText } from "models/graph/config";

export class Utils {
  static buildRect(config: ConfigRect, color: number, size: number) {
    let g = new PIXI.Graphics();
    let width = config.width;

    g.lineStyle(width, color);
    g.drawRect(width / 2, width / 2, size, size);

    return g;
  }

  static buildText(text: string, config: ConfigText, color: number, size: number) {
    let t = new PIXI.Text(text, {
      fontSize: config.size,
      fontFamily: config.font,
      fill: color
    });

    t.x = (size - t.width) / 2;
    t.y = (size - t.height) / 2;

    return t;
  }
}
