import express from "express";
import next from "next";

const app = next({ dev: true });
const handle = app.getRequestHandler();

const run = async () => {
  try {
    await app.prepare();

    const server = express();

    server.get("/api/posts", (req, res) => {
      res.status(200).json({
        message: "next custom server",
      });
    });

    server.all("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(3000, () => {
      console.log("Server is working...");
    });
  } catch (e) {
    console.log(e);
  }
};

run();
