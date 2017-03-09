import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { BehaviorSubject } from "rxjs";

import { Solver } from "models/solver";

@Injectable()
export class SolversService {
  solvers$ = new BehaviorSubject<Solver[]>([]);

  constructor(private http: Http) {
  }

  get solvers() {
    return this.solvers$.getValue();
  }

  updateSolvers(solvers: Solver[]) {
    this.solvers$.next(solvers);
  }

  init() {
    this.http.get("/solvers")
      .map(r => r.json())
      .map(r => r.map((s: any) => Solver.fromJson(s)))
      .subscribe(solvers => this.solvers$.next(solvers));
  }
}
