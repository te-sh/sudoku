import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";

import { Solver } from "models/solver";
import { SolveService } from "services/solve.service";

@Component({
  selector: "sudoku-solvers",
  templateUrl: "solvers.component.html",
  styles: [require("styles/solvers.scss")]
})
export class SolversComponent implements OnInit {
  solvers$: Observable<Solver[]>;

  constructor(private solveService: SolveService) {
  }

  ngOnInit() {
    this.solvers$ = this.solveService.solvers$;
    this.solveService.init();
  }

  statusIcon(solver: Solver) {
    switch (solver.status) {
    case "none": return "fa-fw";
    }
  }
}
