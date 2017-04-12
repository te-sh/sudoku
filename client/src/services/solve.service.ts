import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs";
import * as _ from "lodash";

import { Ground } from "models/board";
import { Cell } from "models/cell";
import { Result } from "models/result";
import { Solver } from "models/solver";

@Injectable()
export class SolveService {
  constructor(private http: Http) {
  }

  solve(ground: Ground, cells: Cell[], solver: Solver): Observable<Result|undefined> {
    let params = {
      ground: ground,
      cells: cells.map(cell => cell.toJson())
    };

    return this.http.post(`/solve/${solver.id}`, params)
      .map(r => r.json())
      .map(r => _.isEmpty(r) ? undefined : Result.fromJson(r));
  }

  apply(cells: Cell[], result?: Result): Cell[] {
    let rcells = _.cloneDeep(cells);

    if (result) {
      if (result.removeCcs) {
        result.removeCcs.forEach(cc => {
          let cell = rcells[cc.index];
          if (cell.cands && cc.cands) {
            cell.cands &= ~cc.cands;
          }
        });
      }
      if (result.decideVcs) {
        result.decideVcs.forEach(vc => {
          let cell = rcells[vc.index];
          cell.setValue(vc.value);
        });
      }
    }

    return rcells;
  }
}
