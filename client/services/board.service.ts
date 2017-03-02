import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { BehaviorSubject } from "rxjs";

import { Board } from "models/board";

@Injectable()
export class BoardService {
  board$ = new BehaviorSubject<Board|undefined>(undefined);

  constructor(private http: Http) {
  }

  init() {
    this.http.get("/board")
      .map(r => r.json())
      .subscribe(r => this.board$.next(new Board(r)));
  }
}
