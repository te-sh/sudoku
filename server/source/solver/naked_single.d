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
    auto decideVcs = board.cells.candsCells
      .filter!(cell => cell.cands.candsSize == 1)
      .map!(cell => cell.newValueCell(cell.cands.candsFront));

    if (!decideVcs.empty)
      return createResult(decideVcs.array);
    else
      return null;
  }

  auto createResult(ValueCell[] decideVcs)
  {
    auto result = new Result();
    result.decideVcs = decideVcs;
    return result;
  }
}
