import * as PIXI from "pixi.js";
import * as _ from "lodash";

import { ConfigRect, ConfigText } from "models/graph/config";

export class Utils {
  static buildRect(config: ConfigRect, color: number, size: number) {
    let g = new PIXI.Graphics();
    let width = config.width;
    let offset = config.offset;

    g.lineStyle(width, color);
    let xy = width / 2 + offset;
    let wh = size - offset * 2 - width + 1;
    g.drawRect(xy, xy, wh, wh);

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

  static buildPoly(points: number[][], config: ConfigRect, color: number) {
    let g = new PIXI.Graphics();
    let width = config.width;

    g.lineStyle(width, color);
    g.drawPolygon(_.flatten(points).map(p => p + width / 2));

    return g;
  }
}
