// var socket = io();
// socket.on("connect", () => {
//   console.log("connect to the server !!");
// });

// socket.on("welcome", msg => {
//   console.log(msg);
// });

// socket.on("newUser", msg => {
//   console.log(msg);
// });
// //send MSG to server
// //Server send MSG to other client
// // socket.emit("createMsg", {
// //   from: "louis A",
// //   text: "Do you see me ? I am Louis A !"
// // });

// socket.on("sendMsg", msg => {
//   // // console.log(msg);
//   // if (msg.text !== "") {
//   //   let liTag = $(
//   //     `<li> ${moment(msg.createAt).format("h:mm a")}- ${msg.text}</li>`
//   //   );
//   //   $("#message").append(liTag);
//   // }

//   const template = $("#message-template").html();
//   const html = Mustache.render(template, {
//     from: msg.from,
//     text: msg.text,
//     createAt: moment(msg.createAt).format("h:mm a")
//   });

//   $("#messages").append(html);
// });

// socket.on("disconnect", () => {
//   console.log("Disconnect to server !!");
// });

// $("#sendLocation").on("click", () => {
//   if (!navigator.geolocation) return alert("AAAAA");

//   navigator.geolocation.getCurrentPosition(position => {
//     console.log(position);

//     const { latitude, longtitude } = position.coords;
//     socket.emit("createLocation", {
//       from: "User",
//       latitude,
//       longtitude
//     });
//   });
// });

// $("#message-form").on("submit", e => {
//   e.preventDefault();

//   socket.emit("createMsg", {
//     from: "User",
//     text: $("[name=message]").val()
//   });
//   $("[name=message]").val("");

//   $("#messages").animate(
//     {
//       scrollTop: $("#messages").get(0).scrollHeight
//     },
//     1500
//   );
// });

// socket.on("sendLocation", msg => {
//   console.log("lat : ", msg.latitude);
//   console.log("long : ", msg.longitude);

//   let liTag = $(`<li></li>`);
//   let aTag = $(`<a>My Location</a>`);
//   aTag.attr(
//     "href",
//     `https://www.google.com/maps/@${msg.latitude},${msg.longitude},18.83z`
//   );
//   aTag.attr("target", "_blank");
//   liTag.append(aTag);
//   $("#messages").append(liTag);
// });
