import std.algorithm, std.conv, std.range, std.typecons;
import vibe.data.json;
import model;

class jBoard
{
  jGround ground;
  jCell[] cells;

  this() { }

  this(jGround ground, jCell[] cells)
  {
    this.ground = ground;
    this.cells = cells;
    jCell.nc = ground.nc;
  }

  static jBoard fromJson(Json json)
  {
    auto board = json.deserializeJson!jBoard;
    jCell.nc = board.ground.nc;
    return board;
  }

  Board toModel()
  {
    auto cells = this.cells.map!(cell => cell.toModel()).array;
    auto ground = this.ground.toModel(cells);
    return new Board(ground, cells);
  }
}

class jGround
{
  int rows, cols, nc;
  jHouse[] houses;

  this() { }

  this(int rows, int cols, int nc, jHouse[] houses)
  {
    this.rows = rows;
    this.cols = cols;
    this.nc = nc;
    this.houses = houses;
  }

  Ground toModel(Cell[] cells)
  {
    auto houses = this.houses.map!(house => house.toModel(cells)).array;
    return new Ground(this.rows, this.cols, this.nc, houses);
  }
}

class jResult
{
  jCell[] removeCcs;
  jCell[] decideVcs;

  static jResult fromModel(Result result)
  {
    auto jresult = new jResult();

    jresult.removeCcs = result.removeCcs.map!(cc => jCell.fromModel(cc)).array;
    jresult.decideVcs = result.decideVcs.map!(vc => jCell.fromModel(vc)).array;

    return jresult;
  }
}

class jHouse
{
  int index;
  string type;
  int[] cells;

  this() { }

  this(int index, string type, int[] cells)
  {
    this.index = index;
    this.type = type;
    this.cells = cells;
  }

  House toModel(Cell[] bCells)
  {
    auto hCells = this.cells.map!(i => bCells[i]).array;
    return new House(this.index, this.type, hCells);
  }
}

class jCell
{
  static int nc;
  int index;
  int cands;

  this() { }

  this(int index, int cands)
  {
    this.index = index;
    this.cands = cands;
  }

  Cell toModel()
  {
    if (this.cands < (1 << nc)) {
      return new CandsCell(this.index, this.cands);
    } else {
      return new ValueCell(this.index, this.cands - (1 << nc));
    }
  }

  static jCell fromModel(Cell cell)
  {
    if (auto cc = cast(CandsCell)(cell)) {
      return new jCell(cc.index, cc.cands);
    } else if (auto vc = cast(ValueCell)(cell)) {
      return new jCell(vc.index, vc.value + (1 << nc));
    } else {
      assert(0);
    }
  }
}

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
