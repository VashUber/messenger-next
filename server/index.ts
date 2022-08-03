import express from "express";
import { app } from "./next";
import router from "./router";
import { createServer } from "http";
import { Server } from "socket.io";

const run = async () => {
  try {
    await app.prepare();

    const server = express();
    server.use(express.json());
    server.use(router);

    const serverhttp = createServer(server);
    const io = new Server(serverhttp, {
      cors: {
        origin: ["http://localhost:3000"],
      },
    });

    io.on("connect", (socket) => {
      socket.on("newMessage", (data) => {
        io.emit("newMessage", data);
      });
    });

    serverhttp.listen(3000, () => {
      console.log("Server is working...");
    });
  } catch (e) {
    console.log(e);
  }
};

run();
