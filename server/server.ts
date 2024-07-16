import connect from "connect";
import fs from "fs";
import * as http from "http";
import livereloadServer from "livereload";
import path from "path";
import serveStatic from "serve-static";
import { Server } from "socket.io";
import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from "./types";

/* =========== HTTP server =========== */

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

const httpServer = http.createServer(app);

httpServer.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

/* =========== WebSocket server =========== */
const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(httpServer); // Attach the websocket server to the http server

io.on("connection", (socket) => {
  socket.data.name = "Guest123";
  io.emit("message", "User " + socket.id + " joined the chat!");
  console.log(`A user connected ` + socket.id);
});

/* =========== Hot reloading =========== */
const liveReloadServer = livereloadServer.createServer();

liveReloadServer.watch(path.join(__dirname, "../client/src"));

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});
