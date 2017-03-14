import { Cell } from "models/cell";
import { Result } from "models/result";
import { Solver } from "models/solver";

type State = "start"|"solve"|"hit"|"mishit"|"apply"|"applied"|"complete";

export interface Interval {
  solved: number;
  applied: number;
}

export interface Store {
  cells: Cell[];
  result?: Result;
  solvers: Solver[];
  solverIndex: number;
  state: State;
  interval?: Interval;
}
