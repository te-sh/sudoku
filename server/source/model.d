import std.algorithm, std.bitmanip, std.conv, std.format, std.math, std.range;

class Board
{
  Ground ground;
  Cell[] cells;

  this(Ground ground, Cell[] cells)
  {
    this.ground = ground;
    this.cells = cells;
  }

  int nc() { return ground.nc; }
  House[] houses() { return ground.houses; }
}

class Ground
{
  int rows, cols, nc;
  House[] houses;

  this(int rows, int cols, int nc, House[] houses)
  {
    this.rows = rows;
    this.cols = cols;
    this.nc = nc;
    this.houses = houses;
  }
}

class Result
{
  CandsCell[] removeCcs;
  ValueCell[] decideVcs;
  CandsCell[] markCcs1;
  CandsCell[] markCcs2;
  Cell[] markCells1;
  Cell[] markCells2;
  House[] markHouses1;
  House[] markHouses2;
}

enum HouseType { row, col, box };

class House
{
  int index;
  HouseType type;
  Cell[] cells;

  this(int index, HouseType type, Cell[] cells)
  {
    this.index = index;
    this.type = type;
    this.cells = cells;
  }

  int opCmp(House o)
  {
    return sgn(index - o.index);
  }
  alias opCmp = Object.opCmp;
}

abstract class Cell
{
  int index;

  this(int index)
  {
    this.index = index;
  }

  CandsCell newCc(int cands = 0)
  {
    return new CandsCell(index, cands);
  }

  ValueCell newVc(int value = 0)
  {
    return new ValueCell(index, value);
  }

  int opCmp(Cell o)
  {
    return sgn(index - o.index);
  }
  alias opCmp = Object.opCmp;

  abstract string dump();
}

class CandsCell: Cell
{
  int cands;

  this(int index, int cands)
  {
    super(index);
    this.cands = cands;
  }

  override string dump()
  {
    auto values = cands.bitsSet.map!"a + 1";
    return format("{index:%d,cands:%s}", index, values.map!(to!string).join);
  }
}

class ValueCell : Cell
{
  int value;

  this(int index, int value)
  {
    super(index);
    this.value = value;
  }

  override string dump()
  {
    return format("{index:%d,value:%d}", index, value + 1);
  }
}
