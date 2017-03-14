import std.algorithm, std.conv, std.range;
import jmodel;

jBoard simpleBoard()
{
  auto rows = 9, cols = 9, nc = 9;
  auto cands = (1 << nc) - 1;

  jHouse[] houses;
  foreach (r; rows.iota) {
    auto house = new jHouse(houses.length.to!int, "row", []);
    foreach (c; cols.iota)
      house.cells ~= r * cols + c;
    houses ~= house;
  }

  foreach (c; cols.iota) {
    auto house = new jHouse(houses.length.to!int, "col", []);
    foreach (r; rows.iota)
      house.cells ~= r * cols + c;
    houses ~= house;
  }

  auto hrows = 3, hcols = 3;
  foreach (br; hrows.iota)
    foreach (bc; hcols.iota) {
      auto house = new jHouse(houses.length.to!int, "box", []);
      foreach (r; hrows.iota)
        foreach (c; hcols.iota)
          house.cells ~= (br * hrows + r) * cols + (bc * hcols + c);
      houses ~= house;
    }

  auto ground = new jGround(rows, cols, nc, houses);

  auto cells = (rows * cols).iota.map!(i => new jCell(i, cands)).array;

  return new jBoard(ground, cells);
}
