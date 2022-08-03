import next from "next";

export const app = next({ dev: true });
export const handle = app.getRequestHandler();
