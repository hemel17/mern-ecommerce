import http from "http";
import app from "./app/index.js";
const server = http.createServer(app);

server.listen(4000, () => {
  console.log("server is running");
});
