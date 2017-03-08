import std.algorithm, std.range;
import model;

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
