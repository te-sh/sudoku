import std.algorithm, std.range;
import model, base, helpers;

class LockedCand : Base
{
  this()
  {
    super("locked-cand", "Locked Cand.");
  }

  override Result solve(Board board)
  {
    auto types = board.houses.map!"a.type".uniq.array;
    foreach (type1; types)
      foreach (type2; types) {
        if (type1 == type2) continue;
        auto result = withTypes(board, type1, type2);
        if (auto result) return result;
      }

    return null;
  }

  auto withTypes(Board board, HouseType type1, HouseType type2) {
    auto houses1 = board.houses.filter!(house => house.type == type1).array;
    auto houses2 = board.houses.filter!(house => house.type == type2).array;
    foreach (house1; houses1)
      foreach (house2; houses2) {
        foreach (c; board.nc.iota) {
          auto ccs1 = house1.candsCells.has(c);
          auto ccs2 = house2.candsCells.has(c);
          auto intCcs = setIntersection(ccs1, ccs2).array;
          if (intCcs.length < 2) continue;

          auto subCcs1 = setDifference(ccs1, intCcs);
          auto subCcs2 = setDifference(ccs2, intCcs);
          if (!subCcs1.empty && subCcs2.empty) {
            auto removeCcs = subCcs1.map!(cc => cc.newCc([c].toCands));
            auto markCcs = intCcs.map!(cc => cc.newCc([c].toCands));
            return createResult(removeCcs.array, markCcs.array, house1, house2);
          }
        }
      }
    return null;
  }

  auto createResult(CandsCell[] removeCcs, CandsCell[] markCcs, House markHouse1, House markHouse2)
  {
    auto result = new Result();
    result.removeCcs = removeCcs;
    result.markCcs1 = markCcs;
    result.markHouses1 = [markHouse1];
    result.markHouses2 = [markHouse2];
    return result;
  }
}
