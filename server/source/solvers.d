import std.algorithm;
import solver;

auto solversList = [new Explicit,
                    new NakedSingle,
                    new HiddenSingle,
                    new LockedCand,
                    new NakedK!2,
                    new NakedK!3,
                    new HiddenK!2,
                    new HiddenK!3,
                    new FishK!2,
                    new FishK!3];

auto getSolver(string method)
{
  return solversList.find!(solver => solver.id == method)[0];
}
