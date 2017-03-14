import std.algorithm, std.range;
import vibe.d;
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

  Json toJson()
  {
    auto json = Json.emptyObject;
    if (!removeCcs.empty) json["removeCcs"] = removeCcs.serializeToJson;
    if (!decideVcs.empty) json["decideVcs"] = decideVcs.serializeToJson;
    return json;
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
