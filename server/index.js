const express = require("express");
const path = require("path"); //built-in nodejs
const socketIO = require("socket.io");
const http = require("http");

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
  socket.emit("email", {
    from: "server",
    to: "thanhliem2701@gmail.com",
    content: "Hello"
  });

  // Nhan tu client
  socket.on("facebook", msg => {
    console.log(msg);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected !");
  });
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
