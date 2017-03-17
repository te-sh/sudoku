import std.algorithm, std.range;
import model, base, helpers;

class Explicit : Base
{
  this()
  {
    super("explicit", "Explicit");
  }

  override Result solve(Board board)
  {
    auto removeCcs = board.cells.map!"a.newCc".array;

    foreach (house; board.houses) {
      auto values = house.valueCells.map!"a.value".toCands;
      foreach (cell; house.candsCells)
        removeCcs[cell.index].cands |= values;
    }

    foreach (removeCc; removeCcs) {
      auto cell = cast(CandsCell)(board.cells[removeCc.index]);
      if (cell !is null)
        removeCc.cands &= cell.cands;
    }

    removeCcs = removeCcs.filter!"a.cands".array;
    if (!removeCcs.empty)
      return createResult(removeCcs);
    else
      return null;
  }

  auto createResult(CandsCell[] removeCcs)
  {
    auto result = new Result();
    result.removeCcs = removeCcs;
    return result;
  }
}
