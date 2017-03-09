import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject, Subscription } from "rxjs";
import * as _ from "lodash";

import { Solver } from "models/solver";
import { Store } from "models/store";
import { BoardService } from "services/board.service";
import { ModeService } from "services/mode.service";
import { SolversService } from "services/solvers.service";
import { SolveHelperService } from "services/solve_helper.service";

@Injectable()
export class SolveService {
  private subscription: Subscription;

  constructor(
    private boardService: BoardService,
    private modeService: ModeService,
    private solversService: SolversService,
    private solveHelperService: SolveHelperService
  ) {
  }

  run() {
    let store$ = new BehaviorSubject<Store>(this.initialStore);
    this.modeService.toggleSolving();

    this.subscription = store$
      .map(store => _.clone(store))
      .switchMap(store => {
        switch (store.state) {
        case "start":  return this.start(store);
        case "solve":  return this.solve(store);
        case "hit":    return this.hit(store);
        case "mishit": return this.mishit(store);
        case "apply":  return this.apply(store);
        default: return this.complete(store);
        }
      })
      .subscribe(
        store => {
          this.boardService.updateCells(store.cells);
          this.boardService.updateResult(store.result);
          this.solversService.updateSolvers(store.solvers);
          if (store.state === "complete") {
            store$.complete();
          } else {
            store$.next(store);
          }
        },
        undefined,
        () => {
          this.modeService.toggleSolving();
        }
      );
  }

  private get initialStore(): Store {
    let result = this.boardService.result;
    return {
      cells: this.boardService.cells,
      result: result,
      solvers: this.solversService.solvers,
      solverIndex: 0,
      state: result ? "apply" : "start"
    };
  }

  private start(store: Store): Observable<Store> {
    let solver = store.solvers[store.solverIndex];
    let solvers = this.newSolvers(store, solver.setStatus("accessing"));
    return Observable.of(_.assign(store, { state: "solve", solvers }));
  }

  private solve(store: Store): Observable<Store> {
    let solver = store.solvers[store.solverIndex];

    return this.solveHelperService
      .solve(this.boardService.ground, store.cells, solver)
      .catch(_e => Observable.throw(store))
      .map(result => {
        if (result) {
          let solvers = this.newSolvers(store, solver.setStatus("hit").countup());
          return _.assign(store, { state: "hit", result, solvers });
        } else {
          let solvers = this.newSolvers(store, solver.setStatus("mishit"));
          return _.assign(store, { state: "mishit", solvers });
        }
      });
  }

  private hit(store: Store): Observable<Store> {
    return Observable.of(_.assign(store, { state: "complete" }));
  }

  private mishit(store: Store): Observable<Store> {
    store.solverIndex++;
    if (store.solverIndex >= store.solvers.length) {
      return Observable.of(_.assign(store, { state: "complelet" }));
    } else {
      return Observable.of(_.assign(store, { state: "start" }));
    }
  }

  private apply(store: Store): Observable<Store> {
    let cells = this.solveHelperService.apply(store.cells, store.result);
    let result = undefined;
    let solvers = store.solvers.map(solver => solver.setStatus("none"));
    return Observable.of(_.assign(store, { state: "complete", cells, result, solvers }));
  }

  private complete(store: Store): Observable<Store> {
    return Observable.of(_.assign(store, { state: "complete" }));
  }

  private newSolvers(store: Store, solver: Solver) {
    let solvers = _.clone(store.solvers);
    solvers[store.solverIndex] = solver;
    return solvers;
  }
}
