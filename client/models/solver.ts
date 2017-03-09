type Status = "none"|"accessing"|"hit"|"mishit"|"abort";

export class Solver {
  count: number;
  status: Status;

  constructor(
    public id: string,
    public name: string,
    count: number = 0,
    status: Status = "none"
  ) {
    this.count = count;
    this.status = status;
  }

  static fromJson(json: any) {
    return new Solver(json.id, json.name);
  }

  setStatus(status: Status) {
    return new Solver(this.id, this.name, this.count, status);
  }

  countup() {
    return new Solver(this.id, this.name, this.count + 1, this.status);
  }
}
