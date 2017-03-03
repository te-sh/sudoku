import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { BehaviorSubject } from "rxjs";
import * as _ from "lodash";

import { Board, Ground, Cell } from "models/board";

@Injectable()
export class BoardService {
  ground$ = new BehaviorSubject<Ground|undefined>(undefined);
  cells$ = new BehaviorSubject<Cell[]|undefined>(undefined);

  private ground: Ground;
  private cells: Cell[];

  constructor(private http: Http) {
  }

  init() {
    this.http.get("/board")
      .map(r => r.json())
      .subscribe(r => {
        let board = new Board(r);
        this.ground = board.ground;
        this.ground$.next(this.ground);
        this.cells = board.cells;
        this.cells$.next(this.cells);
      });
  }

  setValue(cursor: number, value?: number) {
    let cell = this.cells[cursor];
    if (value) {
      cell.cands = undefined;
      cell.value = value;
    } else {
      cell.cands = (1 << this.ground.nc) - 1;
      cell.value = undefined;
    }
    this.cells$.next(_.clone(this.cells));
  }
}
