import { Request, Response, NextFunction } from "express";
import jwtHandler from "../../utils/jwt";

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const refreshToken = req.cookies.refreshToken as string;
    if (!refreshToken) throw new Error("refreshToken is required");

    const accessToken = req.cookies.accessToken as string;
    const newAccessToken = jwtHandler(accessToken, refreshToken);

    if (newAccessToken !== accessToken) {
      res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: true,
      });
    }

    next();
  } catch (e) {
    res.status(502).json({
      message: "error",
    });
    console.log(e);
  }
};

export default auth;
