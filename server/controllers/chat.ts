import { Request, Response } from "express";
import prisma from "../../lib/prisma";
import jwt from "jsonwebtoken";
import { tokenPayloadT } from "../../types";

const chatController = {
  createChat: async (req: Request, res: Response) => {
    try {
      const { email1, email2 }: { email1: string; email2: string } = req.body;

      await prisma.chat.create({
        data: {
          users: {
            connect: [{ email: email1 }, { email: email2 }],
          },
        },
      });

      return res.status(200).json({
        message: "success",
      });
    } catch (e) {
      console.log(e);
      return res.status(502).json({
        message: "erorr",
      });
    }
  },
  getChats: async (req: Request, res: Response) => {
    try {
      const refreshToken = req.cookies.refreshToken as string;
      const decodeRefreshToken = jwt.verify(
        refreshToken,
        process.env.SECRET as string
      ) as tokenPayloadT;

      const chats = await prisma.chat.findMany({
        where: {
          users: {
            some: {
              email: decodeRefreshToken.email,
            },
          },
        },
        include: {
          users: {
            select: {
              name: true,
            },
          },
        },
      });

      res.status(200).json(chats);
    } catch (e) {
      console.log(e);
      return res.status(502).json({
        message: "erorr",
      });
    }
  },
  getChatById: async (req: Request, res: Response) => {
    try {
      const id = +(req.query.id as string);
      const refreshToken = req.cookies.refreshToken as string;
      const decodeRefreshToken = jwt.verify(
        refreshToken,
        process.env.SECRET as string
      ) as tokenPayloadT;

      const chat = await prisma.chat.findFirstOrThrow({
        where: {
          id,
          users: {
            some: {
              email: decodeRefreshToken.email,
            },
          },
        },
        include: {
          messages: {
            select: {
              id: true,
              text: true,
              sender: {
                select: {
                  email: true,
                },
              },
            },
          },
          users: {
            select: {
              name: true,
              email: true,
              id: true,
            },
          },
        },
      });

      return res.status(200).json(chat);
    } catch (e) {
      console.log(e);
      return res.status(502).json({
        message: "error",
      });
    }
  },
};

export default chatController;
