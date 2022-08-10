import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import type { Request, Response } from "express";
import { tokenPayloadT } from "../../types";
import prisma from "../../lib/prisma";
import { User } from "@prisma/client";

const userController = {
  getUser: async (req: Request, res: Response) => {
    try {
      const refreshToken = req.cookies.refreshToken as string;
      const decodeRefreshToken = jwt.verify(
        refreshToken,
        process.env.SECRET as string
      ) as tokenPayloadT;

      const { email, name } = await prisma.user.findUniqueOrThrow({
        where: {
          email: decodeRefreshToken.email,
        },
        select: {
          name: true,
          email: true,
        },
      });

      res.status(200).json({
        email,
        name,
      });
    } catch (e) {
      res.status(502).json({
        message: "error",
      });
      console.log(e);
    }
  },
  signout: (req: Request, res: Response) => {
    res.cookie("accessToken", "", {
      httpOnly: true,
      secure: true,
    });
    res.cookie("refreshToken", "", {
      httpOnly: true,
      secure: true,
    });

    res.status(200).json({
      message: "success",
    });
  },
  signup: async (req: Request, res: Response) => {
    try {
      const { email, password, name }: Omit<User, "id"> = req.body;

      const passwordHash = await bcrypt.hash(
        password,
        +(process.env.SALT as string)
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
  },

  signin: async (req: Request, res: Response) => {
    try {
      const { email, password }: Omit<User, "id"> = req.body;

      const user = await prisma.user.findFirstOrThrow({
        where: {
          email,
        },
      });
      const isEqual = await bcrypt.compare(password, user.password);

      if (!isEqual) {
        throw new Error("Password must match");
      }

      const accessToken = jwt.sign(
        { email: user.email },
        process.env.SECRET as string,
        {
          expiresIn: "10m",
        }
      );
      const refreshToken = jwt.sign(
        { email: user.email },
        process.env.SECRET as string,
        {
          expiresIn: "30d",
        }
      );

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
      });
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
      });
      res.status(200).json({
        message: "success",
      });
    } catch (e) {
      res.status(502);
      console.log(e);
    }
  },
};

export default userController;
