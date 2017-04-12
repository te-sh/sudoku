import { Injectable } from "@angular/core";
import { Subject, BehaviorSubject, Subscription } from "rxjs";
import * as _ from "lodash";

import { Cell } from "models/cell";
import { Solver } from "models/solver";
import { Store, Interval } from "models/store";
import { BoardService } from "services/board.service";
import { ModeService } from "services/mode.service";
import { SolversService } from "services/solvers.service";
import { StoreService } from "services/store.service";
import { HistoryService } from "services/history.service";

@Injectable()
export class SolveNavService {
  private subscription: Subscription;

  constructor(
    private boardService: BoardService,
    private modeService: ModeService,
    private solversService: SolversService,
    private storeService: StoreService,
    private historyService: HistoryService
  ) {
  }

  forward(interval?: Interval) {
    this.modeService.toggleSolving();
    this.solversService.clearStatus();

    let store$ = new BehaviorSubject<Store>(this.initialStore(interval));
    this.subscription = store$
      .map(store => _.clone(store))
      .switchMap(store => this.storeService[store.state](store))
      .subscribe(
        store => this.onNext(store$, store),
        _e => this.onError(),
        () => this.onComplete()
      );
  }

  stop() {
    this.subscription.unsubscribe();
    this.solversService.setStatus("abort");
    this.modeService.toggleSolving();
  }

  historyBack() {
    this.updateHistory(this.historyService.removeLast());
  }

  historyBackToFirst() {
    this.updateHistory(this.historyService.moveToFirst());
  }

  private updateHistory(arg: { cells: Cell[], solvers: Solver[] }) {
    this.boardService.updateCells(arg.cells);
    this.boardService.updateResult(undefined);
    this.solversService.update(arg.solvers);
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
    this.solversService.update(store.solvers);
    if (store.state === "complete") {
      store$.complete();
    } else {
      store$.next(store);
    }
  }

  private onError() {
    this.solversService.setStatus("error");
    this.modeService.toggleSolving();
  }

  private onComplete() {
    this.modeService.toggleSolving();
  }
}
