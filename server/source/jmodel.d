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
  jCell[] markCcs1;
  jCell[] markCcs2;
  int[] markCells1;
  int[] markCells2;
  int[] markHouses1;
  int[] markHouses2;

  static jResult fromModel(Result result)
  {
    auto jresult = new jResult();

    jresult.removeCcs   = result.removeCcs.map!(cc => jCell.fromModel(cc)).array;
    jresult.decideVcs   = result.decideVcs.map!(vc => jCell.fromModel(vc)).array;
    jresult.markCcs1    = result.markCcs1.map!(cc => jCell.fromModel(cc)).array;
    jresult.markCcs2    = result.markCcs2.map!(cc => jCell.fromModel(cc)).array;
    jresult.markCells1  = result.markCells1.map!"a.index".array;
    jresult.markCells2  = result.markCells2.map!"a.index".array;
    jresult.markHouses1 = result.markHouses1.map!"a.index".array;
    jresult.markHouses2 = result.markHouses2.map!"a.index".array;

    return jresult;
  }

  Json toJson()
  {
    auto json = Json.emptyObject;
    if (!removeCcs.empty)   json["removeCcs"]   = removeCcs.serializeToJson;
    if (!decideVcs.empty)   json["decideVcs"]   = decideVcs.serializeToJson;
    if (!markCcs1.empty)    json["markCcs1"]    = markCcs1.serializeToJson;
    if (!markCcs2.empty)    json["markCcs2"]    = markCcs2.serializeToJson;
    if (!markCells1.empty)  json["markCells1"]  = markCells1.serializeToJson;
    if (!markCells2.empty)  json["markCells1"]  = markCells2.serializeToJson;
    if (!markHouses1.empty) json["markHouses1"] = markHouses1.serializeToJson;
    if (!markHouses2.empty) json["markHouses1"] = markHouses2.serializeToJson;
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
