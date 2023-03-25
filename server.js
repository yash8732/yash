const express = require('express');
const app = express();
const path = require('path')
const server = require("http").createServer(app)
const mongoose = require("mongoose");
const router = require('./router/router');
const io = require("socket.io")(server, {
    cors :{
        origin : "* "
    }
})
const users = {};

mongoose.connect("mongodb://127.0.0.1:27017/chat")
.then(() => console.log("Mongoooo Connected"))
.catch((err) => console.log(err.message));


app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public'))); 
app.use(express.urlencoded())   
app.use("/", router);

io.on("connection", socket => {
    console.log("connected");
    socket.on("new_user_joined", name =>{
        console.log("new user: ", name);
        users[socket.id] = name;
        socket.broadcast.emit("user_joined", name);
    })
    socket.on("send", message => {
        console.log("mesage:",message);
        socket.broadcast.emit("recieve", {message : message, name : users[socket.id]})
    })
    socket.on("disconnect", (message) =>{
        console.log("dis");
        socket.broadcast.emit("left", users[socket.id])
        
    })
    
})

server.listen(5000, ()=> console.log("listening..."))
// app.listen(5000, ()=> console.log("listening..."))
// app.listen(3000, () => console.log("app.listen......"))