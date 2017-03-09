import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";

import { Solver } from "models/solver";
import { SolversService } from "services/solvers.service";

@Component({
  selector: "sudoku-solvers",
  templateUrl: "solvers.component.html",
  styles: [require("styles/solvers.scss")]
})
export class SolversComponent implements OnInit {
  solvers$: Observable<Solver[]>;

  constructor(private solversService: SolversService) {
  }

  ngOnInit() {
    this.solvers$ = this.solversService.solvers$.distinctUntilChanged();
    this.solversService.init();
  }

  statusIcon(solver: Solver) {
    switch (solver.status) {
    case "none":      return "";
    case "accessing": return "fa-spinner fa-spin";
    case "hit":       return "fa-check";
    case "mishit":    return "fa-minus";
    case "abort":     return "fa-times";
    case "error":     return "fa-bomb";
    }
  }
}
