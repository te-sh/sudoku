export class Solver {
  constructor(public id: string, public name: string) {
  }

  static fromJson(json: any) {
    return new Solver(json.id, json.name);
  }
}
