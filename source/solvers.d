import std.algorithm;
import solver;

auto solversList = [new Explicit(),
                    new NakedSingle()];

auto getSolver(string method)
{
  return solversList.find!(solver => solver.id == method)[0];
}
