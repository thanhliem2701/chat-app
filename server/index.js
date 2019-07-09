const express = require("express");
const path = require("path"); //built-in nodejs
const socketIO = require("socket.io");
const http = require("http");
const { generateTextMessage } = require("../template/message");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// __dirname là đường dẫn tuyệt đối
// console.log(__dirname);
const publicPath = path.join(__dirname + "/../public");
app.use(express.static(publicPath));

// chat app
io.on("connection", socket => {
  console.log("New user connected to server !");

  // public topic (MSG/email/...) ban cho client
  // ban len server
  socket.emit(
    "welcome",
    generateTextMessage("Admin", "Welcome to the chat app !")
  );

  socket.broadcast.emit(
    "newUser",
    generateTextMessage("Admin", "New user join to the room")
  );

  socket.on("createMsg", msg => {
    console.log(msg);
    io.emit("sendMsg", generateTextMessage(msg.from, msg.text));
  });

  //   // Nhan tu client
  //   socket.on("facebook", msg => {
  //     console.log(msg);
  //   });

  socket.on("disconnect", () => {
    console.log("User disconnected !");
  });
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
