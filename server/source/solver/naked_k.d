import std.algorithm, std.range;
import mir.combinatorics;
import model, base, helpers;

class NakedK(int k) if (k >= 2 || k <= 4) : Base
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
      foreach (candVs; board.nc.iota.combinations(k)) {
        auto cands = candVs.toCands;
        auto markCcs = houseCcs
          .filter!(cc => !(cc.cands & ~cands))
          .array;

        if (markCcs.length != k) continue;
        if (markCcs.map!"a.cands".fold!"a | b" != cands) continue;

        auto removeCcs = setDifference(houseCcs, markCcs)
          .map!(cc => cc.newCc(cc.cands & cands))
          .filter!"a.cands"
          .array;

        if (!removeCcs.empty)
          return createResult(removeCcs, markCcs, house);
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
