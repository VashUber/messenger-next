import next from "next";

export const app = next({
  dev: true,
  customServer: true,
  hostname: "localhost",
  port: 3000,
});
export const handle = app.getRequestHandler();
