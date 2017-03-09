export class Solver {
  count: number;
  status: "none"|"accessing"|"hit"|"mishit"|"abort";

  constructor(public id: string, public name: string) {
    this.count = 0;
    this.status = "none";
  }

  static fromJson(json: any) {
    return new Solver(json.id, json.name);
  }
}
