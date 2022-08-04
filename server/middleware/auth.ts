import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { tokenPayloadT } from "../../types";

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const refreshToken = req.cookies.refreshToken as string;
    if (!refreshToken) throw new Error("refreshToken is required");
    const decodeRefreshToken = jwt.verify(
      refreshToken,
      process.env.SECRET as string
    ) as tokenPayloadT;

    const accessToken = req.cookies.accessToken as string;

    jwt.verify(accessToken, process.env.SECRET as string, (error, token) => {
      if (error?.message === "jwt expired") {
        const accessToken = jwt.sign(
          { email: decodeRefreshToken.email },
          process.env.SECRET as string,
          {
            expiresIn: "10m",
          }
        );
        res.cookie("accessToken", accessToken, {
          httpOnly: true,
          secure: true,
        });
      }
    });

    next();
  } catch (e) {
    console.log(e);
  }
};

export default auth;
