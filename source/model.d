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
  ValueCell[] decideCcs;
}

class House
{
  int index;
  string type;
  Cell[] cells;

  this(int index, string type, Cell[] cells)
  {
    this.index = index;
    this.type = type;
    this.cells = cells;
  }
}

abstract class Cell
{
  int index;

  this(int index)
  {
    this.index = index;
  }

  CandsCell newCandsCell(int cands = 0)
  {
    return new CandsCell(index, cands);
  }

  ValueCell newValueCell(int value = 0)
  {
    return new ValueCell(index, value);
  }
}

class CandsCell: Cell
{
  int cands;

  this(int index, int value)
  {
    super(index);
    this.cands = cands;
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
}
