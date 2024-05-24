import dotenv from "dotenv"
import app from "./src/app.js"
import {Server} from "socket.io";
import { connectDB } from "./src/db/server.js"

dotenv.config({
    path: "./.env"
})

let corsOptions = {
    cors: {
        origin: "*",
        credentials: true,
    },
}

connectDB().then(() => {
    const server = app.listen(process.env.PORT || 5000, () => {
        console.log(`💻 SERVER IS RUNNING AT PORT ${process.env.PORT}`)
    })

    const io = new Server(server, corsOptions);

    global.onlineUsers = new Map();
    io.on("connection", (socket) => {
        global.chatSocket = socket;
        socket.on("add-user", (userId) => {
            onlineUsers.set(userId, socket.id);
        });

        socket.on("send-msg", (data) => {
            const sendUserSocket = onlineUsers.get(data.to);
            if (sendUserSocket) {
                socket.to(sendUserSocket).emit("msg-recieve", data.message);
            }
        });
    });
})
    .catch((err) => {
        console.log("MONGODB CONNECTION FAILED", err);
    })

