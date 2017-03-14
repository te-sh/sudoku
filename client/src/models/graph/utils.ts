import * as PIXI from "pixi.js";
import * as _ from "lodash";

import { ConfigRect, ConfigText, ConfigCirc } from "models/graph/config";

export class Utils {
  static buildRect(config: ConfigRect, color: number, size: number, visible = false) {
    let g = new PIXI.Graphics();
    g.visible = visible;

    let width = config.width;
    let offset = config.offset;
    if (width) {
      g.lineStyle(width, color, config.alpha);
      let xy = width / 2 + offset;
      let wh = size - offset * 2;
      g.drawRect(xy, xy, wh, wh);
    }

    return g;
  }

  static buildText(text: string, config: ConfigText, color: number, size: number) {
    let t = new PIXI.Text(text, {
      fontSize: config.size,
      fontFamily: config.font,
      fill: color
    });

    t.x = Math.ceil((size - t.width) / 2);
    t.y = Math.ceil((size - t.height) / 2);

    return t;
  }

  static buildCirc(config: ConfigCirc, color: number, size: number, visible = false) {
    let g = new PIXI.Graphics();
    g.visible = visible;

    g.lineStyle(1, color, config.alpha);
    g.beginFill(color, config.alpha);
    g.drawCircle(size / 2, size / 2, config.size);
    g.endFill();

    return g;
  }

  static buildPoly(points: number[][], config: ConfigRect, color: number, visible = false) {
    let g = new PIXI.Graphics();
    g.visible = visible;

    let width = config.width;
    if (width) {
      g.lineStyle(width, color, config.alpha);
      g.drawPolygon(_.flatten(points));
    }

    return g;
  }
}
