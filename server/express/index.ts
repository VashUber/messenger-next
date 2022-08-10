import express from "express";
import { createServer } from "http";
import cookies from "cookie-parser";
import router from "../router";

const server = express();
server.use(express.json());
server.use(cookies());
server.use(router);

const serverhttp = createServer(server);

export default serverhttp;
