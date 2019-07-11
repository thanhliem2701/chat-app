const express = require("express");
const path = require("path"); //built-in nodejs
const socketIO = require("socket.io");
const http = require("http");
const {
  generateTextMessage,
  generateLocation
} = require("../template/message");

const { Users } = require("./Users");
const users = new Users();

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

  //joinRoom
  socket.on("joinRoom", userObj => {
    const { name, room } = userObj;
    // console.log("TCL: userObj", userObj);

    socket.join(room);

    const newUser = {
      id: socket.id,
      name,
      room
    };
    users.addUser(newUser);
    // console.log(users.list);
    io.to(room).emit("listUser", {
      listUser: users.getListOfUserInRoom(room)
    });
    // console.log("aaa",room);
    // public topic (MSG/email/...) ban cho client
    // ban len server
    socket.emit(
      "sendMsg",
      generateTextMessage("Admin", "Welcome to the chat app !")
    );

    socket.broadcast
      .to(room)
      .emit(
        "sendMsg",
        generateTextMessage("Admin", "New user join to the room !")
      );

    socket.on("createMsg", msg => {
      // console.log(msg);
      // console.log(room);
      io.to(room).emit("sendMsg", generateTextMessage(msg.from, msg.text));
    });

    // get location from user
    socket.on("createLocation", msg => {
      io.to(room).emit(
        "sendLocation",
        generateLocation(msg.from, msg.latitude, msg.longtitude)
      );
    });

    //   // Nhan tu client
    //   socket.on("facebook", msg => {
    //     console.log(msg);
    //   });

    socket.on("disconnect", () => {
      users.removeUserById(newUser.id);
      socket.broadcast
        .to(room)
        .emit("sendMsg", generateTextMessage("Admin", `${name} left`));
      // console.log(users.list);
      io.to(room).emit("listUser", {
        listUser: users.getListOfUserInRoom(room)
      });
    });
  });
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
