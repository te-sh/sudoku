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

auto has(CandsCell cell, int cand)
{
  return cell.cands.candsInclude(cand);
}

auto has(R)(R cells, int cand)
  if (isInputRange!R && is(ElementType!R == CandsCell))
{
  return cells.filter!(cell => cell.has(cand));
}
