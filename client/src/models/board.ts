import * as _ from "lodash";

import { Cell } from "./cell";

export class Board {
  constructor(
    public ground: Ground,
    public cells: Cell[],
    public problems: boolean[]
  ) {
  }

  static fromJson(json: any) {
    let ground = Ground.fromJson(json.ground);

    Cell.nc = ground.nc;
    let cells = json.cells.map((js: any) => Cell.fromJson(js));

    let problems: boolean[];
    if (json.problems) {
      problems = json.problems;
    } else {
      problems = _.times(cells.length, _.constant(false));
    }

    return new Board(ground, cells, problems);
  }
}

export class Ground {
  candRows: number;
  candCols: number;

  constructor(
    public rows: number,
    public cols: number,
    public nc: number,
    public houses: House[]
  ) {
    this.candRows = Math.floor(Math.sqrt(this.nc));
    this.candCols = Math.ceil(Math.sqrt(this.nc));
  }

  static fromJson(json: any) {
    let houses = json.houses.map((js: any) => House.fromJson(js));
    return new Ground(json.rows, json.cols, json.nc, houses);
  }

  indexToPos(index: number) {
    return { col: index % this.cols, row: Math.floor(index / this.rows) };
  }

  posToIndex(pos: { col: number, row: number }) {
    return pos.row * this.cols + pos.col;
  }

  candIndexToPos(index: number) {
    return { col: index % this.candCols, row: Math.floor(index / this.candRows) };
  }
}

export class House {
  constructor(
    public index: number,
    public type: string,
    public cells: number[]
  ) {
  }

  static fromJson(json: any) {
    return new House(json.index, json.type, json.cells);
  }
}
