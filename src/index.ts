import connect from "connect";
import livereload from "connect-livereload";
import * as http from "http";
import serveStatic from "serve-static";

const hostname: string = "127.0.0.1";
const port: number = 3000;

const app = connect();

app.use(livereload());

app.use(serveStatic("dist"));

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
