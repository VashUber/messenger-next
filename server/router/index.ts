import { Router } from "express";
import { handle } from "../next";
import auth from "../middleware/auth";
import userController from "../controllers/user";

const router = Router();

router.get("/api/user", auth, userController.getUser);
router.get("/api/signout", userController.signout);
router.post("/api/signup", userController.signup);
router.post("/api/signin", userController.signin);

router.all("*", (req, res) => {
  return handle(req, res);
});

export default router;
