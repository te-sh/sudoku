export class Board {
  rows: number;
  cols: number;
  nc: number;
  candRows: number;
  candCols: number;
  cells: Cell[];
  houses: House[];

  constructor(json: any) {
    this.rows = json.rows;
    this.cols = json.cols;
    this.nc = json.nc;
    this.candRows = Math.floor(Math.sqrt(this.nc));
    this.candCols = Math.ceil(Math.sqrt(this.nc));
    this.cells = json.cells.map((js: any) => new Cell(this.nc, js));
    this.houses = json.houses.map((js: any) => new House(js));
  }

  indexToPos(index: number) {
    return { col: index % this.cols, row: Math.floor(index / this.rows) };
  }

  candIndexToPos(index: number) {
    return { col: index % this.candCols, row: Math.floor(index / this.candRows) };
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
