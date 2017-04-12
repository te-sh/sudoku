import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import * as _ from "lodash";

import { Solver } from "models/solver";
import { Store } from "models/store";
import { BoardService } from "services/board.service";
import { SolveService } from "services/solve.service";
import { HistoryService } from "services/history.service";

@Injectable()
export class StoreService {
  constructor(
    private boardService: BoardService,
    private solveService: SolveService,
    private historyService: HistoryService
  ) {
  }

  start(store: Store): Observable<Store> {
    let solver = store.solvers[store.solverIndex];
    let solvers = this.newSolvers(store, solver.setStatus("accessing"));
    return this.newStore(store, "solve", { solvers });
  }

  solve(store: Store): Observable<Store> {
    let solver = store.solvers[store.solverIndex];

    return this.solveService
      .solve(this.boardService.ground, store.cells, solver)
      .map(result => {
        if (result) {
          this.historyService.add(store.cells, store.solvers);
          let state = "hit";
          let solvers = this.newSolvers(store, solver.setStatus("hit").countup());
          return _.assign(store, { state, result, solvers });
        } else {
          let state = "mishit";
          let solvers = this.newSolvers(store, solver.setStatus("mishit"));
          return _.assign(store, { state, solvers });
        }
      });
  }

  hit(store: Store): Observable<Store> {
    if (store.interval) {
      return this.newStore(store, "apply").delay(store.interval.solved);
    } else {
      return this.newStore(store, "complete");
    }
  }

  mishit(store: Store): Observable<Store> {
    store.solverIndex++;
    if (store.solverIndex >= store.solvers.length) {
      return this.newStore(store, "complete");
    } else {
      return this.newStore(store, "start");
    }
  }

  apply(store: Store): Observable<Store> {
    let cells = this.solveService.apply(store.cells, store.result);
    let result = undefined;
    let solvers = store.solvers.map(solver => solver.setStatus("none"));
    let solverIndex = 0;
    return this.newStore(store, "applied", { cells, result, solvers, solverIndex });
  }

  applied(store: Store): Observable<Store> {
    if (store.interval) {
      return this.newStore(store, "start").delay(store.interval.applied);
    } else {
      return this.newStore(store, "complete");
    }
  }

  complete(store: Store): Observable<Store> {
    return this.newStore(store, "complete");
  }

  private newStore(store: Store, state: string, additional?: any): Observable<Store> {
    return Observable.of(_.assign(store, { state }, additional));
  }

  private newSolvers(store: Store, solver: Solver) {
    let solvers = _.clone(store.solvers);
    solvers[store.solverIndex] = solver;
    return solvers;
  }
}
