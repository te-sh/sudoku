import { Injectable } from "@angular/core";
import { Observable, Subject, BehaviorSubject, Subscription } from "rxjs";
import * as _ from "lodash";

import { Solver } from "models/solver";
import { Store, Interval } from "models/store";
import { BoardService } from "services/board.service";
import { ModeService } from "services/mode.service";
import { SolversService } from "services/solvers.service";
import { SolveHelperService } from "services/solve_helper.service";
import { HistoryService } from "services/history.service";

@Injectable()
export class SolveService {
  private subscription: Subscription;

  constructor(
    private boardService: BoardService,
    private modeService: ModeService,
    private solversService: SolversService,
    private solveHelperService: SolveHelperService,
    private historyService: HistoryService
  ) {
  }

  forward(interval?: Interval) {
    this.modeService.toggleSolving();
    this.solversService.clearSolvers();

    let store$ = new BehaviorSubject<Store>(this.initialStore(interval));
    this.subscription = store$
      .map(store => _.clone(store))
      .switchMap(store => {
        switch (store.state) {
        case "start":   return this.start(store);
        case "solve":   return this.solve(store);
        case "hit":     return this.hit(store);
        case "mishit":  return this.mishit(store);
        case "apply":   return this.apply(store);
        case "applied": return this.applied(store);
        default:        return this.complete(store);
        }
      })
      .subscribe(
        store => this.onNext(store$, store),
        _e => this.onError(),
        () => this.onComplete()
      );
  }

  stop() {
    this.subscription.unsubscribe();
    this.solversService.setSolvers("abort");
    this.modeService.toggleSolving();
  }

  stepBackward() {
    let { cells, solvers } = this.historyService.removeLast();
    this.boardService.updateCells(cells);
    this.boardService.updateResult(undefined);
    this.solversService.updateSolvers(solvers);
  }

  private initialStore(interval?: Interval): Store {
    let result = this.boardService.result;
    return {
      cells: this.boardService.cells,
      result: result,
      solvers: this.solversService.solvers,
      solverIndex: 0,
      state: result ? "apply" : "start",
      interval: interval
    };
  }

  private onNext(store$: Subject<Store>, store: Store) {
    this.boardService.updateCells(store.cells);
    this.boardService.updateResult(store.result);
    this.solversService.updateSolvers(store.solvers);
    if (store.state === "complete") {
      store$.complete();
    } else {
      store$.next(store);
    }
  }

  private onError() {
    this.solversService.setSolvers("error");
    this.modeService.toggleSolving();
  }

  private onComplete() {
    this.modeService.toggleSolving();
  }

  private start(store: Store): Observable<Store> {
    let solver = store.solvers[store.solverIndex];
    let solvers = this.newSolvers(store, solver.setStatus("accessing"));
    return this.newStore(store, "solve", { solvers });
  }

  private solve(store: Store): Observable<Store> {
    let solver = store.solvers[store.solverIndex];

    return this.solveHelperService
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

  private hit(store: Store): Observable<Store> {
    if (store.interval) {
      return this.newStore(store, "apply").delay(store.interval.solved);
    } else {
      return this.newStore(store, "complete");
    }
  }

  private mishit(store: Store): Observable<Store> {
    store.solverIndex++;
    if (store.solverIndex >= store.solvers.length) {
      return this.newStore(store, "complete");
    } else {
      return this.newStore(store, "start");
    }
  }

  private apply(store: Store): Observable<Store> {
    let cells = this.solveHelperService.apply(store.cells, store.result);
    let result = undefined;
    let solvers = store.solvers.map(solver => solver.setStatus("none"));
    let solverIndex = 0;
    return this.newStore(store, "applied", { cells, result, solvers, solverIndex });
  }

  private applied(store: Store): Observable<Store> {
    if (store.interval) {
      return this.newStore(store, "start").delay(store.interval.applied);
    } else {
      return this.newStore(store, "complete");
    }
  }

  private complete(store: Store): Observable<Store> {
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
