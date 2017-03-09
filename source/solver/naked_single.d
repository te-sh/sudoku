import std.algorithm, std.range;
import model, base, helpers;

class NakedSingle : Base
{
  this()
  {
    super("naked-single", "Naked Single");
  }

  override Result solve(Board board)
  {
    auto decideCcs = board.cells.candsCells
      .filter!(cell => cell.cands.candsSize == 1)
      .map!(cell => cell.newValueCell(cell.cands.candsFront))
      .array;
    return createResult(decideCcs);
  }

  auto createResult(ValueCell[] decideCcs)
  {
    if (!decideCcs.empty) {
      auto result = new Result();
      result.decideCcs = decideCcs;
      return result;
    } else {
      return null;
    }
  }
}
