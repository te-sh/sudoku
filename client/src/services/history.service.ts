import { BehaviorSubject } from "rxjs";
import * as _ from "lodash";

import { Cell } from "models/cell";
import { Solver } from "models/solver";
import { History } from "models/history";

export class HistoryService {
  histories$ = new BehaviorSubject<History[]>([]);

  get histories() {
    return this.histories$.getValue();
  }

  add(cells: Cell[], solvers: Solver[]) {
    this.histories$.next(this.histories.concat({
      cells: cells,
      solvers: solvers.map(solver => solver.setStatus("none"))
    }));
  }

  removeLast() {
    let history = _.last(this.histories);
    this.histories$.next(_.dropRight(this.histories));
    return history;
  }

  clear() {
    this.histories$.next([]);
  }
}
