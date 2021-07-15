import express from "express";
import * as http from "http";

const port = process.env.PORT || 3000;
const app = express();

const server = http.createServer(app);

app.get("*", (_, res) => {
  res.send("Server app");
  res.end();
});

server.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
