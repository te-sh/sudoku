import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { BehaviorSubject } from "rxjs";
import * as _ from "lodash";

import { Board, Ground, Cell } from "models/board";

@Injectable()
export class BoardService {
  ground$ = new BehaviorSubject<Ground|undefined>(undefined);
  cells$ = new BehaviorSubject<Cell[]|undefined>(undefined);
  problems$ = new BehaviorSubject<boolean[]|undefined>(undefined);

  private ground: Ground;
  private cells: Cell[];
  private problems: boolean[];

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
        this.problems = board.problems;
        this.problems$.next(this.problems);
      });
  }

  clear() {
    this.cells = _.cloneDeep(this.cells);
    this.cells.forEach(cell => {
      cell.setValue(this.ground.nc, undefined);
    });
    this.cells$.next(this.cells);

    this.problems = _.clone(this.problems);
    _.fill(this.problems, false);
    this.problems$.next(this.problems);
  }

  setValue(cursor: number, value?: number) {
    let cell = _.clone(this.cells[cursor]);
    cell.setValue(this.ground.nc, value);

    this.cells = _.clone(this.cells);
    this.cells[cursor] = cell;
    this.cells$.next(this.cells);

    this.problems = _.clone(this.problems);
    this.problems[cursor] = !_.isUndefined(value);
    this.problems$.next(this.problems);
  }
}
