import { Server } from "socket.io"
import http from "http"
import express from "express"

const app = express()

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: [process.env.CLIENT_URL || "http://localhost:5173"],
        credentials: true   //for cookies
    }
})

//listen to any incoming connections
io.on("connection", (socket)=>{
    // console.log("A user connected: ", socket.id);

    //when someone joins
    socket.on("join", (userId)=>{
        socket.join(userId)
        // console.log(`User ${userId} joined their room`);
    })

    //when someone sends message
    socket.on("sendMessage", (message)=>{
        io.to(message.receiverId).emit("receiveMessage", message)
        io.to(message.senderId).emit("receiveMessage", message)
    })

    //when someone disconnects
    socket.on("disconnect", ()=>{
        // console.log("A user disconnected: ", socket.id);
    })
})


export {io, app, server}

