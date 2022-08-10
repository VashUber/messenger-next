import serverhttp from "./express";
import { app } from "./next";
import socketInit from "./socket";

const run = async () => {
  try {
    await app.prepare();

    socketInit();

    serverhttp.listen(3000, () => {
      console.log("Server is working...");
    });
  } catch (e) {
    console.log(e);
  }
};

run();
