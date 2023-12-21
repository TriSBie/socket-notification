import { Server } from "socket.io";
import express from "express"
import http from "http";

const server = http.createServer();
const app = express();

app.get("/", (req, res) => {
    res.send("<h1>Hello world</h1>")
})

let onlineUsers = [];

const addNewUser = (username, socketId) => {
    !onlineUsers.some(user => user.username === username) && onlineUsers.push({ username, socketId })
}

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173" //  client address
    }
})

io.on("connection", (socket) => {
    console.log("Some one has logged")
    socket.emit("message", "hello world");
    socket.on("disconnect", () => {
        console.log("Someone has left")
    })
})

server.listen(3000); // server address

