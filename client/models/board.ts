export class Board {
  rows: number;
  cols: number;
  nc: number;
  candRows: number;
  candCols: number;
  cells: Cell[];

  constructor(json: any) {
    this.rows = json.rows;
    this.cols = json.cols;
    this.nc = json.nc;
    this.candRows = Math.floor(Math.sqrt(this.nc));
    this.candCols = Math.ceil(Math.sqrt(this.nc));
    this.cells = json.cells.map((c: number) => new Cell(this.nc, c));
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
      this.value = (json.cands >> nc);
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
