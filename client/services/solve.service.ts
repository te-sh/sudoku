import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { BehaviorSubject } from "rxjs";

import { Solver } from "models/solver";
import { BoardService } from "services/board.service";

@Injectable()
export class SolveService {
  solvers$ = new BehaviorSubject<Solver[]>([]);

  private solvers: Solver[];

  constructor(
    private http: Http,
    private boardService: BoardService
  ) {
  }

  init() {
    this.http.get("/solvers")
      .map(r => r.json())
      .subscribe(r => {
        this.solvers = r.map((s: any) => Solver.fromJson(s));
        this.solvers$.next(this.solvers);
      });
  }

  solve() {
    let params = {
      ground: this.boardService.ground,
      cells: this.boardService.cells.map(cell => cell.toJson())
    };

    this.http.post("/solve/explicit", params)
      .map(r => r.json())
      .subscribe(r => console.log(r));
  }
}
