import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import uniqid from "uniqid";
import cookies from "cookie-parser";
import router from "./router";
import { app } from "./next";
import type { messageT } from "./../types/index";

const run = async () => {
  try {
    await app.prepare();

    const server = express();
    server.use(express.json());
    server.use(cookies());
    server.use(router);

    const serverhttp = createServer(server);
    const io = new Server(serverhttp, {
      cors: {
        origin: ["http://localhost:3000"],
      },
    });

    io.on("connect", (socket) => {
      socket.on("newMessage", (data: Omit<messageT, "id">) => {
        io.emit("newMessage", { text: data.text, id: uniqid() });
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
