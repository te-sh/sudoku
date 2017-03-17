import std.algorithm, std.range;
import mir.combinatorics;
import model, base, helpers;

class FishK(int k) if (k >= 2 || k <= 4) : Base
{
  this()
  {
    static if (k == 2) {
      super("x-wing", "X-Wing");
    } else if (k == 3) {
      super("swordfish", "Swordfish");
    } else if (k == 4) {
      super("jellyfish", "Jellyfish");
    } else {
      assert(0);
    }
  }

  override Result solve(Board board)
  {
    auto cellToHouses = new CellToHouses(board);

    if (auto result = withTypes(board, HouseType.row, HouseType.col, cellToHouses))
      return result;

    if (auto result = withTypes(board, HouseType.col, HouseType.row, cellToHouses))
      return result;

    return null;
  }

  auto withTypes(Board board, HouseType type1, HouseType type2, CellToHouses cellToHouses)
  {
    auto houses1 = board.houses.filter!(house => house.type == type1).array;

    foreach (markHouses; houses1.combinations(k))
      foreach (c; board.nc.iota) {
        if (markHouses.any!(house => house.candsCells.has(c).empty)) continue;
        auto targetCcs = markHouses.candsCells.has(c).array.sort();

        auto houses2 = targetCcs
          .map!(cc => cellToHouses[cc].typeOf(type2))
          .joiner.array.sort().uniq.array;

        if (houses2.length != k) continue;

        auto orthCcs = houses2.candsCells.has(c).array.sort();
        auto removeCcs = setDifference(orthCcs, targetCcs).map!(cc => cc.newCc([c]));
        auto markCcs = targetCcs.map!(cc => cc.newCc([c]));

        if (!removeCcs.empty)
          return createResult(removeCcs, markCcs, markHouses);
      }

    return null;
  }

  auto createResult(R1, R2, R3)(R1 removeCcs, R2 markCcs, R3 markHouses)
  {
    auto result = new Result();
    result.removeCcs = removeCcs.array;
    result.markCcs1 = markCcs.array;
    result.markHouses1 = markHouses.array;
    return result;
  }
}
