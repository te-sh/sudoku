import vibe.vibe, vibe.data.json;
import jmodel, solvers;

import std.stdio;

void getBoard(HTTPServerRequest req, HTTPServerResponse res)
{
  res.writeJsonBody(simpleBoard);
}

void getSolvers(HTTPServerRequest req, HTTPServerResponse res)
{
  res.writeJsonBody(solversList);
}

void solve(HTTPServerRequest req, HTTPServerResponse res)
{
  auto solver = getSolver(req.params["method"]);
  auto board = req.json.deserializeJson!jBoard.toSolve;
  auto result = solver.solve(board);

  if (result)
    res.writeJsonBody(result);
  else
    res.writeJsonBody(Json.emptyObject);
}

void main()
{
  auto router = new URLRouter;
  router.get("/board", &getBoard);
  router.get("/solvers", &getSolvers);
  router.post("/solve/:method", &solve);
  router.get("/", serveStaticFiles("./public/index.html"));
  router.get("*", serveStaticFiles("./public/"));

  auto settings = new HTTPServerSettings;
  settings.port = 8081;
  settings.bindAddresses = ["::1", "0.0.0.0"];
  listenHTTP(settings, router);

  runApplication();
}
