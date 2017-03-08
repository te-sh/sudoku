import std.algorithm, std.range;
import base, solve;

class Explicit : Base
{
  this()
  {
    super("explicit", "Explicit");
  }

  override Result solve(Board board) {
    auto removeCandsCells = board.cells.map!"a.newCandsCell".array;

    foreach (house; board.houses) {
      auto values = house.cells.valueCells.map!"a.value".toCands;
      foreach (cell; house.cells.candsCells)
        removeCandsCells[cell.index].cands |= values;
    }

    removeCandsCells = removeCandsCells.filter!"a.cands".array;

    if (!removeCandsCells.empty) {
      auto result = new Result();
      result.removeCandsCells = removeCandsCells;
      return result;
    } else {
      return null;
    }
  }
}
