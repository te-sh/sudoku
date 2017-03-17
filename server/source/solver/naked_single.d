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
      .map!(cell => cell.newVc(cell.cands.candsFront));

    if (!decideVcs.empty)
      return createResult(decideVcs);
    else
      return null;
  }

  auto createResult(R)(R decideVcs)
  {
    auto result = new Result();
    result.decideVcs = decideVcs.array;
    return result;
  }
}
