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
    auto bufCcs = board.cells.map!(cell => cell.newCc).array;

    foreach (house; board.houses) {
      auto values = house.valueCells.map!"a.value".toCands;
      foreach (cell; house.candsCells)
        bufCcs[cell.index].cands |= values;
    }

    foreach (cc; bufCcs) {
      auto cell = cast(CandsCell)(board.cells[cc.index]);
      if (cell !is null)
        cc.cands &= cell.cands;
    }

    auto removeCcs = bufCcs.filter!"a.cands";

    if (!removeCcs.empty)
      return createResult(removeCcs);
    else
      return null;
  }

  auto createResult(R)(R removeCcs)
  {
    auto result = new Result();
    result.removeCcs = removeCcs.array;
    return result;
  }
}
