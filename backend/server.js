const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

io.on("connection", (socket) => {

  console.log("A user connected");

  socket.on("chat message", (data) => {
    console.log("message:", data);
    io.emit("chat message", data);
  });

  socket.on("emergency alert", (data) => {
    console.log("EMERGENCY:", data);
    io.emit("emergency alert", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});