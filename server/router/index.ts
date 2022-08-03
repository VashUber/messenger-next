import { Router } from "express";
import { handle } from "../next";

const router = Router();

router.get("/api/posts", (req, res) => {
  res.status(200).json({
    message: "next custom server",
  });
});

router.all("*", (req, res) => {
  return handle(req, res);
});

export default router;
