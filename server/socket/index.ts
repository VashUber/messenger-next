import { Server } from "socket.io";
import serverhttp from "../express";
import { User } from "@prisma/client";
import prisma from "../../lib/prisma";

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

    socket.on(
      "newMessage",
      async (data: {
        chatId: number;
        receiver: string;
        sender: string;
        text: string;
      }) => {
        const to = onlineUsers.get(data.receiver);
        await prisma.message.create({
          data: {
            Chat: {
              connect: {
                id: data.chatId,
              },
            },
            sender: {
              connect: {
                email: data.sender,
              },
            },
            text: data.text,
          },
        });

        io.to(socket.id).emit("newMessage", { chatId: data.chatId });

        if (!to) return;

        io.to(to).emit("newMessage", { chatId: data.chatId });
      }
    );

    socket.on("disconnect", () => {
      onlineUsers.delete(user.email);
    });
  });
};

export default socketInit;
