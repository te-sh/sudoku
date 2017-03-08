import solve;

abstract class Base
{
  string id;
  string name;

  this(string id, string name)
  {
    this.id = id;
    this.name = name;
  }

  abstract Result solve(Board board);
}
