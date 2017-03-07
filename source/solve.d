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
  Cell[] cells;

  this(int index, string type, Cell[] cells)
  {
    this.index = index;
    this.type = type;
    this.cells = cells;
  }
}

class Cell
{
  int index;

  this(int index)
  {
    this.index = index;
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
