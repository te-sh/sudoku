import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable, BehaviorSubject, Subscription } from "rxjs";
import * as _ from "lodash";

import { Result } from "models/result";
import { Store } from "models/store";
import { BoardService } from "services/board.service";
import { SolversService } from "services/solvers.service";

@Injectable()
export class SolveService {
  private subscription: Subscription;

  constructor(
    private http: Http,
    private boardService: BoardService,
    private solversService: SolversService
  ) {
  }

  start() {
    let store$ = new BehaviorSubject<Store>(this.initialStore);

    this.subscription = store$.switchMap(store => {
      let nstore = _.clone(store);
      switch (nstore.state) {
      case "start": return this.solve(nstore);
      default: return this.complete(nstore);
      }
    }).subscribe(store => {
      this.boardService.updateCells(store.cells);
      this.boardService.updateResult(store.result);
      this.solversService.updateSolvers(store.solvers);
    });
  }

  private get initialStore(): Store {
    return {
      cells: this.boardService.cells,
      result: undefined,
      solvers: this.solversService.solvers,
      solverIndex: 0,
      state: "start"
    };
  }

  private solve(store: Store): Observable<Store> {
    let solver = store.solvers[store.solverIndex];

    let params = {
      ground: this.boardService.ground,
      cells: store.cells.map(cell => cell.toJson())
    };

    return this.http.post(`/solve/${solver.id}`, params)
      .map(r => r.json())
      .map(result => {
        if (result) {
          let nsolver = _.assign({}, solver, { status: "hit" });
          let solvers = _.assign([], store.solvers, { [store.solverIndex]: nsolver });
          return _.merge(store, { state: "hit", result: Result.fromJson(result), solvers });
        } else {
          let nsolver = _.assign({}, solver, { status: "mishit" });
          let solvers = _.assign([], store.solvers, { [store.solverIndex]: nsolver });
          return _.merge(store, { state: "mishit", solvers });
        }
      });
  }

  private complete(store: Store): Observable<Store> {
    return Observable.of(_.merge(store, { state: "complete" }));
  }
}
