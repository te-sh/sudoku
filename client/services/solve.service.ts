import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { BehaviorSubject } from "rxjs";

import { Solver } from "models/solver";

@Injectable()
export class SolveService {
  solvers$ = new BehaviorSubject<Solver[]>([]);

  private solvers: Solver[];

  constructor(private http: Http) {
  }

  init() {
    this.http.get("/solvers")
      .map(r => r.json())
      .subscribe(r => {
        this.solvers = r.map((s: any) => Solver.fromJson(s));
        this.solvers$.next(this.solvers);
      });
  }
}
