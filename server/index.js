import { Server } from "socket.io";
import express from "express"
import http from "http";

const server = http.createServer();
const app = express();

let onlineUsers = [];

const addNewUser = (username, socketId) => {
    !onlineUsers.some(user => user.username === username) && onlineUsers.push({ username, socketId })
}

const removeUser = (socketId) => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
}

const getUser = (username) => {
    return onlineUsers.find((user) => user.username === username);
}

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173" //  client address
    }
})

io.on("connection", (socket) => {
    console.log({ onlineUsers });
    socket.on("connection", () => {
        console.log("User connected");
    })

    socket.on("newUser", (username) => {
        if (username) {
            addNewUser(username, socket.id)
        }
    })

    socket.on("sendNotification", ({ senderName, receiverName, type }) => {
        const receiver = getUser(receiverName);
        console.log({ receiver });
        io.to(receiver.socketId).emit("getNotification", {
            senderName,
            type
        })
    })

    socket.on("getUser", (username) => {
        getUser(username)
    })

    socket.on("disconnect", () => {
        removeUser(socket.id)
    })
})

server.listen(3000); // server address
