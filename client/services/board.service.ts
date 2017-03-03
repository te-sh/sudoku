import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { BehaviorSubject } from "rxjs";

import { Board } from "models/board";

@Injectable()
export class BoardService {
  board$ = new BehaviorSubject<Board|undefined>(undefined);

  private board: Board;

  constructor(private http: Http) {
  }

  init() {
    this.http.get("/board")
      .map(r => r.json())
      .subscribe(r => {
        this.board = new Board(r);
        this.board$.next(this.board);
      });
  }

  setValue(cursor: number, value?: number) {
    let cell = this.board.cells[cursor];
    if (value) {
      cell.cands = undefined;
      cell.value = value;
    } else {
      cell.cands = (1 << this.board.nc) - 1;
      cell.value = undefined;
    }
    this.board$.next(this.board);
  }
}
