import { Cell } from "models/cell";

export class Result {
  constructor(
    public removeCcs?: Cell[],
    public decideVcs?: Cell[]
  ) {
  }

  static fromJson(json: any) {
    return new Result(
      json.removeCcs ? json.removeCcs.map((cc: any) => Cell.fromJson(cc)) : undefined,
      json.decideVcs ? json.decideVcs.map((vc: any) => Cell.fromJson(vc)) : undefined
    );
  }
}
