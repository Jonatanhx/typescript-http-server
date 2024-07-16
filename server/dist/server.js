"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connect_1 = __importDefault(require("connect"));
const connect_livereload_1 = __importDefault(require("connect-livereload"));
const fs_1 = __importDefault(require("fs"));
const http = __importStar(require("http"));
const livereload_1 = __importDefault(require("livereload"));
const path_1 = __importDefault(require("path"));
const serve_static_1 = __importDefault(require("serve-static"));
const liveReloadServer = livereload_1.default.createServer({
    port: 35729,
});
liveReloadServer.watch(path_1.default.join(__dirname, "..", "client/src"));
liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
});
const hostname = "127.0.0.1";
const port = 3000;
const app = (0, connect_1.default)();
app.use((0, connect_livereload_1.default)());
app.use((0, serve_static_1.default)(path_1.default.join(__dirname, "..", "client/src")));
app.use((req, res) => {
    if (req.url === "/") {
        const indexPath = path_1.default.join(__dirname, "..", "client/src", "index.html");
        fs_1.default.createReadStream(indexPath).pipe(res);
    }
    else {
        res.writeHead(404);
        res.end("Not Found");
    }
});
const server = http.createServer(app);
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
