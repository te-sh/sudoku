import std.algorithm, std.range, core.bitop;
import model;

int toCands(R)(R values)
  if (isInputRange!R && is(ElementType!R == int))
{
  return values.fold!((a, b) => (1 << a) | (1 << b))(0);
}

int candsSize(int cands)
{
  return cast(uint)(cands).popcnt;
}

int candsFront(int cands)
{
  return cast(uint)(cands).bsf;
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
