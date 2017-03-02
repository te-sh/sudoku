export class Board {
  rows: number;
  cols: number;
  nc: number;
  cells: Cell[];

  constructor(json: any) {
    this.rows = json.rows;
    this.cols = json.cols;
    this.nc = json.n;
    this.cells = json.cells.map((c: number) => new Cell(this.nc, c));
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
