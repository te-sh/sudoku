import std.algorithm, std.range;
import mir.combinatorics;
import model, base, helpers;

class HiddenK(int k) if (k >= 2 || k <= 4) : Base
{
  this()
  {
    static if (k == 2) {
      super("hidden-pair", "Hidden Pair");
    } else if (k == 3) {
      super("hidden-triple", "Hidden Triple");
    } else if (k == 4) {
      super("hidden-quad", "Hidden Quad");
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
        auto targetCcs = houseCcs.filter!(cc => cc.cands & cands).array;
        if (targetCcs.length != k) continue;

        auto markCcs = targetCcs
          .map!(cc => cc.newCc(cc.cands & cands))
          .array;

        if (markCcs.map!"a.cands".fold!"a | b" != cands) continue;

        auto removeCcs = targetCcs
          .map!(cc => cc.newCc(cc.cands & ~cands))
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
