import vibe.vibe;

import board;

void getBoard(HTTPServerRequest req, HTTPServerResponse res)
{
  res.writeJsonBody(simpleBoard);
}

void main()
{
  auto router = new URLRouter;
  router.get("/board", &getBoard);
  router.get("/", serveStaticFiles("./public/index.html"));
  router.get("*", serveStaticFiles("./public/"));

  auto settings = new HTTPServerSettings;
  settings.port = 8081;
  settings.bindAddresses = ["::1", "0.0.0.0"];
  listenHTTP(settings, router);

  logInfo("Please open http://127.0.0.1:8081/ in your browser.");
  runApplication();
}
