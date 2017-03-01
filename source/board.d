import std.algorithm, std.conv, std.range;

class Board
{
  int rows, cols;
  int cands;
  Cell[] cells;
  House[] houses;

  this(int rows, int cols, int cands, Cell[] cells, House[] houses)
  {
    this.rows = rows;
    this.cols = cols;
    this.cands = cands;
    this.cells = cells;
    this.houses = houses;
  }
}

class Cell
{
  int index;
  int cands;

  this(int index, int cands)
  {
    this.index = index;
    this.cands = cands;
  }
}

class House
{
  int index;
  string type;
  int[] cells;

  this(int index, string type, int[] cells)
  {
    this.index = index;
    this.type = type;
    this.cells = cells;
  }
}

Board simpleBoard()
{
  auto rows = 3, cols = 3, n = rows * cols;
  auto cands = (1 << n) - 1;
  auto cells = (n * n).iota.map!(i => new Cell(i, cands)).array;

  House[] houses;
  foreach (r; n.iota) {
    auto house = new House(houses.length.to!int, "row", []);
    foreach (c; n.iota)
      house.cells ~= r * n + c;
    houses ~= house;
  }

  foreach (c; n.iota) {
    auto house = new House(houses.length.to!int, "col", []);
    foreach (r; n.iota)
      house.cells ~= r * n + c;
    houses ~= house;
  }

  foreach (br; rows.iota)
    foreach (bc; cols.iota) {
      auto house = new House(houses.length.to!int, "col", []);
      foreach (r; rows.iota)
        foreach (c; cols.iota)
          house.cells ~= (br * rows + r) * n + (bc * cols + c);
    }

  return new Board(rows, cols, cands, cells, houses);
}
