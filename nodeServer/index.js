// node server which will handle socket io connections
const io = require("socket.io")

const users = {};
const port = 443;

io.on("connection", socket =>{
    socket.on("new-user-joined", name =>{
        // console.log("New user", name);
        users[socket.id] = name;
        socket.broadcast.emit("user-joined", name);
    });

    socket.on("send", message =>{
        socket.broadcast.emit("receive", {message: message, name: users[socket.id]})
    });

    socket.on("disconnect", message =>{
        socket.broadcast.emit("left", users[socket.id]);
        delete users[socket.id];
    });


})

server.listen(process.env.PORT || 80);