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
  private marks: { [key: string]: PIXI.Graphics };
  private points: number[][];

  constructor(
    private house: House,
    private config: Config,
    latticePoints: LatticePoint[]
  ) {
    this.setContainer();
    this.setPoints(latticePoints);
    if (house.type === "box") {
      this.setFrameGraphics();
    }
    this.setMarksGraphics();
  }

  private setPoints(latticePoints: LatticePoint[]) {
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
    this.points = poly.geometry.coordinates[0];
  }

  private setContainer() {
    this.container = new PIXI.Container();
  }

  private setFrameGraphics() {
    let config = this.config.house;
    let width = config.frame.width;
    let points = this.points.map(([x, y]) => [x + width / 2, y + width / 2]);
    this.frame = Utils.buildPoly(points, config.frame, config.frame.color!, true);
    this.container.addChild(this.frame);
  }

  private setMarksGraphics() {
    let config = this.config.house;
    let points = this.points.map(point => this.getInnerPoint(point));
    this.marks = {
      mark1: Utils.buildPoly(points, config.markPoly, config.markPoly.colors![0]),
      mark2: Utils.buildPoly(points, config.markPoly, config.markPoly.colors![1])
    };
    _.forEach(this.marks, g => this.container.addChild(g));
  }

  private getInnerPoint(point: number[]) {
    let [x, y] = point;
    let config = this.config.house;
    let offset = config.markPoly.offset - 1 + config.markPoly.width / 2;
    let width = config.frame.width;
    let ps = [
      [x - offset        , y - offset],
      [x + offset + width, y - offset],
      [x + offset + width, y + offset + width],
      [x - offset        , y + offset + width]
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
