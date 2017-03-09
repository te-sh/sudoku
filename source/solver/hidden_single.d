import std.algorithm, std.range;
import model, base, helpers;

class HiddenSingle : Base
{
  this()
  {
    super("hidden-single", "Hidden Single");
  }

  override Result solve(Board board)
  {
    auto types = board.houses.map!"a.type".uniq.array;
    foreach (type; types) {
      House[] markHouses;
      ValueCell[] decideVcs;

      foreach (house; board.houses.filter!(house => house.type == type)) {
        ValueCell[] vcs;
        foreach (cand; board.nc.iota) {
          auto cells = house.candsCells.filter!(cell => cell.has(cand)).array;
          if (cells.length == 1)
            vcs ~= cells[0].newValueCell(cand);
        }
        if (!vcs.empty) {
          markHouses ~= house;
          decideVcs ~= vcs;
        }
      }

      if (!decideVcs.empty)
        return createResult(decideVcs);
    }
    return null;
  }

  auto createResult(ValueCell[] decideVcs)
  {
    if (!decideVcs.empty) {
      auto result = new Result();
      result.decideVcs = decideVcs;
      return result;
    } else {
      return null;
    }
  }
}
