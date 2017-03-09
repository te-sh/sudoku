import { Cell } from "models/cell";
import { Result } from "models/result";
import { Solver } from "models/solver";

export interface Store {
  cells: Cell[];
  result?: Result;
  solvers: Solver[];
  solverIndex: number;
  state: "start"|"solving"|"hit"|"mishit"|"complete";
}
