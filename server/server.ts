import connect from "connect";
import fs from "fs";
import * as http from "http";
import livereloadServer from "livereload";
import path from "path";
import serveStatic from "serve-static";

const liveReloadServer = livereloadServer.createServer();

liveReloadServer.watch(path.join(__dirname, "../client/src"));

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

const hostname = "127.0.0.1";
const port = 3000;

const app = connect();

app.use(serveStatic(path.join(__dirname, "../client/src")));

app.use((req, res) => {
  if (req.url === "/") {
    const indexPath = path.join(__dirname, "../client/src/index.html");
    fs.createReadStream(indexPath).pipe(res);
  } else {
    res.writeHead(404);
    res.end("Not Found");
  }
});

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
