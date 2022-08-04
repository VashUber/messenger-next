import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const refreshToken = req.headers.authorization;
    if (!refreshToken) throw new Error("refreshToken is required");
    const decodeRefreshToken = jwt.verify(
      refreshToken.split(" ")[1],
      process.env.SECRET as string
    );
    const accessToken = req.cookies.auth as string;
    jwt.verify(
      accessToken,
      process.env.SECRET as string,
      (error, decodeAccessToken) => {
        console.log(error);
      }
    );
  } catch (e) {
    console.log(e);
  }
};
