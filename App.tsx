// import cors from "cors";

import cors from "cors";

const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = socketIo(server);

app.use(cors());

io.on("connection", (socket) => {
  console.log("New client connected");

  // Send a message to the client on connection
//   socket.emit("message", "Hello from server");
//   console.log("message emitted");

  // Listen for messages from the client
  socket.on("message", (data) => {
    console.log("Message received: ", data);
    // Broadcast the message to all connected clients
    io.emit("message", data);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Listening on port ${port}`));