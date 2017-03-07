import * as _ from "lodash";

export class Cell {
  static nc: number;

  static get ncOffset() {
    return 1 << this.nc;
  }

  constructor(public index: number, public cands?: number, public value?: number) {
  }

  static fromJson(json: any) {
    if (json.cands >= Cell.ncOffset) {
      return new Cell(json.index, undefined, json.cands - Cell.ncOffset);
    } else {
      return new Cell(json.index, json.cands, undefined);
    }
  }

  toJson() {
    return {
      index: this.index,
      cands: _.isUndefined(this.value) ? this.cands : this.value + Cell.ncOffset
    };
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
