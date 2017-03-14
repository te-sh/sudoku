import { Cell } from "models/cell";
import { Solver } from "models/solver";

export interface History {
  cells: Cell[];
  solvers: Solver[];
}
