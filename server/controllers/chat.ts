import { Request, Response } from "express";
import prisma from "../../lib/prisma";

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
      return res.status(503).json({
        message: "erorr",
      });
    }
  },
  getChats: async (req: Request, res: Response) => {
    try {
      const { email }: { email: string } = req.body;

      const chats = await prisma.chat.findMany({
        where: {
          users: {
            some: {
              email: email,
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

      res.status(200).json({
        chats,
      });
    } catch (e) {
      console.log(e);
      return res.status(503).json({
        message: "erorr",
      });
    }
  },
};

export default chatController;
