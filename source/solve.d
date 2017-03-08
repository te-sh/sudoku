import std.algorithm, std.range;

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
  CandsCell[] removeCandsCells;
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

int toCands(R)(R values)
  if (isInputRange!R && is(ElementType!R == int))
{
  return values.fold!((a, b) => (1 << a) | (1 << b))(0);
}

auto candsCells(R)(R cells)
  if (isInputRange!R && is(ElementType!R == Cell))
{
  return cells
    .map!(cell => cast(CandsCell)(cell))
    .filter!(cell => cell !is null);
}

auto valueCells(R)(R cells)
  if (isInputRange!R && is(ElementType!R == Cell))
{
  return cells
    .map!(cell => cast(ValueCell)(cell))
    .filter!(cell => cell !is null);
}
