import std.algorithm, std.conv, std.range;

class Board
{
  Ground ground;
  Cell[] cells;

  this(Ground ground, Cell[] cells)
  {
    this.ground = ground;
    this.cells = cells;
  }
}

class Ground
{
  int rows, cols;
  int nc;
  House[] houses;

  this(int rows, int cols, int nc, House[] houses)
  {
    this.rows = rows;
    this.cols = cols;
    this.nc = nc;
    this.houses = houses;
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

Board simpleBoard()
{
  auto rows = 9, cols = 9, nc = 9;
  auto cands = (1 << nc) - 1;

  House[] houses;
  foreach (r; rows.iota) {
    auto house = new House(houses.length.to!int, "row", []);
    foreach (c; cols.iota)
      house.cells ~= r * cols + c;
    houses ~= house;
  }

  foreach (c; cols.iota) {
    auto house = new House(houses.length.to!int, "col", []);
    foreach (r; rows.iota)
      house.cells ~= r * cols + c;
    houses ~= house;
  }

  auto hrows = 3, hcols = 3;
  foreach (br; hrows.iota)
    foreach (bc; hcols.iota) {
      auto house = new House(houses.length.to!int, "box", []);
      foreach (r; hrows.iota)
        foreach (c; hcols.iota)
          house.cells ~= (br * hrows + r) * cols + (bc * hcols + c);
      houses ~= house;
    }

  auto ground = new Ground(rows, cols, nc, houses);

  auto cells = (rows * cols).iota.map!(i => new Cell(i, cands)).array;

  return new Board(ground, cells);
}
