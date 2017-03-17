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
        auto checkCcs = markHouses
          .map!(house => house.candsCells.has(c).array)
          .array;
        if (!checkCcs.all!"a.length") continue;
        auto targetCcs = checkCcs.joiner.array.sort();

        auto houses2 = targetCcs
          .map!(cc => cellToHouses[cc].filter!(house2 => house2.type == type2))
          .joiner.array.sort().uniq.array;

        if (houses2.length != k) continue;

        auto orthCcs = houses2
          .map!(house2 => house2.candsCells.has(c).array)
          .joiner.array.sort();

        auto removeCcs = setDifference(orthCcs, targetCcs)
          .map!(cc => cc.newCc([c].toCands));

        auto markCcs = targetCcs.map!(cc => cc.newCc([c].toCands));

        if (!removeCcs.empty)
          return createResult(removeCcs.array, markCcs.array, markHouses.array);
      }

    return null;
  }

  auto createResult(CandsCell[] removeCcs, CandsCell[] markCcs, House[] markHouses)
  {
    auto result = new Result();
    result.removeCcs = removeCcs;
    result.markCcs1 = markCcs;
    result.markHouses1 = markHouses;
    return result;
  }
}
