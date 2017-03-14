import { Cell } from "models/cell";

export class Result {
  constructor(
    public removeCcs?: Cell[],
    public decideVcs?: Cell[],
    public markCcs1?: Cell[],
    public markCcs2?: Cell[],
    public markCells1?: number[],
    public markCells2?: number[],
    public markHouses1?: number[],
    public markHouses2?: number[]
  ) {
  }

  static fromJson(json: any) {
    return new Result(
      json.removeCcs ? json.removeCcs.map((cc: any) => Cell.fromJson(cc)) : undefined,
      json.decideVcs ? json.decideVcs.map((vc: any) => Cell.fromJson(vc)) : undefined,
      json.markCcs1 ? json.markCcs1.map((cc: any) => Cell.fromJson(cc)) : undefined,
      json.markCcs2 ? json.markCcs2.map((cc: any) => Cell.fromJson(cc)) : undefined,
      json.markCells1,
      json.markCells2,
      json.markHouses1,
      json.markHouses2
    );
  }
}
