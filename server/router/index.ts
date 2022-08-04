import { Router } from "express";
import bcrypt from "bcrypt";
import { User } from "@prisma/client";
import { handle } from "../next";
import prisma from "../../lib/prisma";

const router = Router();

router.post("/api/signup", async (req, res) => {
  try {
    const { email, password, name }: Omit<User, "id"> = req.body;

    const passwordHash = await bcrypt.hash(
      password,
      +(process.env.salt as string)
    );

    await prisma.user.create({
      data: {
        password: passwordHash,
        email,
        name,
      },
    });

    res.status(200).json({
      message: "success",
    });
  } catch (e) {
    res.status(502);
    console.log(e);
  }
});

router.all("*", (req, res) => {
  return handle(req, res);
});

export default router;
