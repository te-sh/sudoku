import std.algorithm, std.range, core.bitop;
import model;

int toCands(R)(R values)
  if (isInputRange!R && is(ElementType!R == int))
{
  return values.map!"1 << a".fold!("a | b")(0);
}

int candsSize(int cands)
{
  return cast(uint)(cands).popcnt;
}

int candsFront(int cands)
{
  return cast(uint)(cands).bsf;
}

bool candsInclude(int cands, int cand)
{
  return (cands & (1 << cand)) != 0;
}

CandsCell newCc(Cell cell, int cands = 0)
{
  return new CandsCell(cell.index, cands);
}

CandsCell newCc(Cell cell, int[] cands)
{
  return cell.newCc(cands.toCands);
}

ValueCell newVc(Cell cell, int value = 0)
{
  return new ValueCell(cell.index, value);
}

auto has(CandsCell cell, int cand)
{
  return cell.cands.candsInclude(cand);
}

auto has(R)(R cells, int cand)
  if (isInputRange!R && is(ElementType!R == CandsCell))
{
  return cells.filter!(cell => cell.has(cand));
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

auto candsCells(House house)
{
  return house.cells.candsCells;
}

auto valueCells(House house)
{
  return house.cells.valueCells;
}

auto candsCells(R)(R houses)
  if (isInputRange!R && is(ElementType!R == House))
{
  return houses.map!(house => house.candsCells).joiner.array.sort();
}

auto valueCells(R)(R houses)
  if (isInputRange!R && is(ElementType!R == House))
{
  return houses.map!(house => house.valueCells).joiner.array.sort();
}

auto typeOf(R)(R houses, HouseType type)
  if (isInputRange!R && is(ElementType!R == House))
{
  return houses.filter!(house => house.type == type);
}

class CellToHouses
{
  House[][] housesList;

  this(Board board)
  {
    housesList = new House[][](board.cells.length);

    foreach (house; board.houses)
      foreach (cell; house.cells) {
        housesList[cell.index] ~= house;
      }
  }

  auto opIndex(Cell cell)
  {
    return housesList[cell.index];
  }
}
