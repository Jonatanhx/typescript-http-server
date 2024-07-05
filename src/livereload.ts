import livereload from "livereload";
import path from "path";

const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "..", "dist"));

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});
