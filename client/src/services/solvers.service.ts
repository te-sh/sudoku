import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { BehaviorSubject } from "rxjs";

import { Solver, Status } from "models/solver";

@Injectable()
export class SolversService {
  solvers$ = new BehaviorSubject<Solver[]>([]);

  constructor(private http: Http) {
  }

  get solvers() {
    return this.solvers$.getValue();
  }

  update(solvers: Solver[]) {
    this.solvers$.next(solvers);
  }

  clear() {
    let solvers = this.solvers.map(solver => solver.reset());
    this.solvers$.next(solvers);
  }

  clearStatus() {
    let solvers = this.solvers.map(solver => solver.setStatus("none"));
    this.solvers$.next(solvers);
  }

  setStatus(status: Status) {
    let solvers = this.solvers.map(solver => {
      if (solver.status === "accessing") {
        return solver.setStatus(status);
      } else {
        return solver;
      }
    });
    this.solvers$.next(solvers);
  }

  init() {
    this.http.get("/solvers")
      .map(r => r.json())
      .map(r => r.map((s: any) => Solver.fromJson(s)))
      .subscribe(solvers => this.solvers$.next(solvers));
  }
}
