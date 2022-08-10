import { Router } from "express";
import { handle } from "../next";
import auth from "../middleware/auth";
import userController from "../controllers/user";
import chatController from "../controllers/chat";

const router = Router();

// user

router.get("/api/user", auth, userController.getUser);
router.get("/api/signout", userController.signout);
router.post("/api/signup", userController.signup);
router.post("/api/signin", userController.signin);

// chat

router.get("/api/chats", auth, chatController.getChats);
router.get("/api/chat", auth, chatController.getChatById);
router.post("/api/chat", auth, chatController.createChat);

router.all("*", (req, res) => {
  return handle(req, res);
});

export default router;
