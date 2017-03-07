import vibe.vibe;
import solvers;

import serialize;

void getBoard(HTTPServerRequest req, HTTPServerResponse res)
{
  res.writeJsonBody(simpleBoard);
}

void getSolvers(HTTPServerRequest req, HTTPServerResponse res)
{
  res.writeJsonBody(solversList);
}

void main()
{
  auto router = new URLRouter;
  router.get("/board", &getBoard);
  router.get("/solvers", &getSolvers);
  router.get("/", serveStaticFiles("./public/index.html"));
  router.get("*", serveStaticFiles("./public/"));

  auto settings = new HTTPServerSettings;
  settings.port = 8081;
  settings.bindAddresses = ["::1", "0.0.0.0"];
  listenHTTP(settings, router);

  runApplication();
}
