import { Server } from "socket.io";
import serverhttp from "../express";
import type { messageT } from "../../types";
import uniqid from "uniqid";

const io = new Server(serverhttp, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});

const socketInit = () => {
  io.on("connect", (socket) => {
    console.log(socket.handshake.auth);

    socket.on("newMessage", (data: Omit<messageT, "id">) => {
      io.emit("newMessage", { text: data.text, id: uniqid() });
    });
  });
};

export default socketInit;
