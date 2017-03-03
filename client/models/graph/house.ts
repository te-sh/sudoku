import * as PIXI from "pixi.js";
import * as turf from "@turf/turf";

import { House } from "models/board";
import { Config } from "models/graph/config";
import { LatticePoint } from "models/graph/lattice_point";
import { Utils } from "models/graph/utils";

export class GraphHouse {
  container: PIXI.Container;

  private frame: PIXI.Graphics;
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
    let poly = turf.simplify(cellPolys.reduce((p1, p2) => turf.union(p1, p2)));
    this.points = poly.geometry.coordinates[0];
  }

  private setContainer() {
    this.container = new PIXI.Container();
  }

  private setFrameGraphics() {
    this.frame = Utils.buildPoly(
      this.points,
      this.config.house.frame,
      this.config.house.frame.color!
    );

    this.container.addChild(this.frame);
  }
}
