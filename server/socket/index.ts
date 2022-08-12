import { Server } from "socket.io";
import serverhttp from "../express";
import type { messageT } from "../../types";
import uniqid from "uniqid";
import { User } from "@prisma/client";

const io = new Server(serverhttp, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});

const onlineUsers = new Map<string, string>();
type socketAuthT = Omit<User, "id" | "password">;

const socketInit = () => {
  io.on("connect", (socket) => {
    const user = socket.handshake.auth as socketAuthT;
    onlineUsers.set(user.email, socket.id);

    socket.on("newMessage", (data: Omit<messageT, "id">) => {
      const to = onlineUsers.get(data.receiver);

      if (!to) return;

      io.to(to).emit("newMessage", { text: data.text, id: uniqid() });
    });

    socket.on("disconnect", () => {
      onlineUsers.delete(user.email);
    });
  });
};

export default socketInit;
