import * as _ from "lodash";

export class Board {
  ground: Ground;
  cells: Cell[];
  problems: boolean[];

  constructor(json: any) {
    this.ground = new Ground(json.ground);
    this.cells = json.cells.map((js: any) => new Cell(this.ground.nc, js));
    if (json.problems) {
      this.problems = json.problems;
    } else {
      this.problems = _.times(this.cells.length, _.constant(false));
    }
  }
}

export class Ground {
  rows: number;
  cols: number;
  nc: number;
  candRows: number;
  candCols: number;
  houses: House[];

  constructor(json: any) {
    this.rows = json.rows;
    this.cols = json.cols;
    this.nc = json.nc;
    this.candRows = Math.floor(Math.sqrt(this.nc));
    this.candCols = Math.ceil(Math.sqrt(this.nc));
    this.houses = json.houses.map((js: any) => new House(js));
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
  index: number;
  type: string;
  cells: number[];

  constructor(json: any) {
    this.index = json.index;
    this.type = json.type;
    this.cells = json.cells;
  }
}

export class Cell {
  index: number;
  cands?: number;
  value?: number;

  constructor(nc: number, json: any) {
    this.index = json.index;
    if (json.cands >= (1 << nc)) {
      this.value = json.cands - (1 << nc);
    } else {
      this.cands = json.cands;
    }
  }

  has(cand: number) {
    return !!this.cands && (this.cands & (1 << cand)) !== 0;
  }

  setValue(nc: number, value?: number) {
    if (_.isUndefined(value)) {
      this.cands = (1 << nc) - 1;
      delete this.value;
    } else {
      delete this.cands;
      this.value = value;
    }
  }
}
