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

  auto settings = new HTTPServerSettings;
  settings.port = 8080;
  settings.bindAddresses = ["::1", "127.0.0.1"];
  listenHTTP(settings, router);

  logInfo("Please open http://127.0.0.1:8080/ in your browser.");
  runApplication();
}
