import std.algorithm, std.range;
import mir.combinatorics;
import model, base, helpers;

class NakedK(int k) : Base
{
  this()
  {
    static if (k == 2) {
      super("naked-pair", "Naked Pair");
    } else if (k == 3) {
      super("naked-triple", "Naked Triple");
    } else if (k == 4) {
      super("naked-quad", "Naked Quad");
    } else {
      assert(0);
    }
  }

  override Result solve(Board board)
  {
    foreach (house; board.houses) {
      auto houseCcs = house.candsCells.array;
      foreach (markCcs; houseCcs.combinations(k)) {
        auto cands = markCcs.map!"a.cands".fold!"a | b";
        if (cands.candsSize != k) continue;

        auto removeCcs = setDifference(houseCcs, markCcs)
          .map!(cc => cc.newCandsCell(cc.cands & cands))
          .filter!(cc => cc.cands);

        if (!removeCcs.empty)
          return createResult(removeCcs.array, markCcs.array, house);
      }
    }

    return null;
  }

  auto createResult(CandsCell[] removeCcs, CandsCell[] markCcs, House markHouse)
  {
    auto result = new Result();
    result.removeCcs = removeCcs;
    result.markCcs1 = markCcs;
    result.markHouses1 = [markHouse];
    return result;
  }
}
