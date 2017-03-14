import * as PIXI from "pixi.js";
import * as _ from "lodash";
import * as turf from "@turf/turf";

import { House } from "models/board";
import { Config } from "models/graph/config";
import { LatticePoint } from "models/graph/lattice_point";
import { Utils } from "models/graph/utils";

export class GraphHouse {
  container: PIXI.Container;

  private frame: PIXI.Graphics;
  private marks: {[key: string]: PIXI.Graphics};
  private points: number[][];

  constructor(
    private house: House,
    private config: Config,
    latticePoints: LatticePoint[]
  ) {
    this.setContainer();
    this.setPoints(latticePoints, this.config.house.frame.width);
    if (house.type === "box") {
      this.setFrameGraphics();
    }
    if (house.type === "box") {
      this.setMarksGraphics();
    }
  }

  private setPoints(latticePoints: LatticePoint[], width: number) {
    let cellPolys = this.house.cells.map(cell => {
      let p = latticePoints[cell];
      return turf.polygon([[
        [p.left, p.top],
        [p.left, p.bottom],
        [p.right, p.bottom],
        [p.right, p.top],
        [p.left, p.top]
      ]]);
    });
    let unioned = turf.union(...cellPolys);
    let poly = turf.simplify(unioned, 0.1, false);
    this.points = poly.geometry.coordinates[0]
      .map(([x, y]: [number, number]) => [x + width / 2, y + width / 2]);
  }

  private setContainer() {
    this.container = new PIXI.Container();
  }

  private setFrameGraphics() {
    let config = this.config.house;
    this.frame = Utils.buildPoly(this.points, config.frame, config.frame.color!);
    this.container.addChild(this.frame);
  }

  private setMarksGraphics() {
    let config = this.config.house;
    let width = config.markPoly.width;
    let offset = config.markPoly.offset;
    let points = this.points.map(point => this.getInnerPoint(point, offset, width));
    this.marks = {
      mark1: Utils.buildPoly(points, config.markPoly, config.markPoly.colors![0])
    };
    //_.forEach(this.marks, g => this.container.addChild(g));
  }

  private getInnerPoint(point: number[], offset: number, width: number) {
    let [x, y] = point;
    let ps = [
      [x - offset - width / 2, y - offset - width / 2],
      [x + offset + width / 2, y - offset - width / 2],
      [x + offset + width / 2, y + offset + width / 2],
      [x - offset - width / 2, y + offset + width / 2]
    ];
    let poly = turf.polygon([this.points]);
    let insides = ps.map(p => turf.inside(turf.point(p), poly));
    switch (insides.filter(_.identity).length) {
    case 1:
      return ps[insides.indexOf(true)];
    case 3:
      return ps[insides.indexOf(false)];
    default:
      return point;
    }
  }
}
