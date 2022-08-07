import { tokenPayloadT } from "./../../types/index";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import jwtHandler from "../../utils/jwt";

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const refreshToken = req.cookies.refreshToken as string;
    if (!refreshToken) throw new Error("refreshToken is required");

    jwt.verify(refreshToken, process.env.SECRET as string, (error, token) => {
      if (error?.message === "jwt expired") {
        res.cookie("accessToken", "", {
          httpOnly: true,
          secure: true,
        });
        res.cookie("refreshToken", "", {
          httpOnly: true,
          secure: true,
        });
        return res.redirect(req.baseUrl + "/signin");
      }

      const accessToken = req.cookies.accessToken as string;
      const newAccessToken = jwtHandler(accessToken, token as tokenPayloadT);

      if (newAccessToken !== accessToken) {
        res.cookie("accessToken", newAccessToken, {
          httpOnly: true,
          secure: true,
        });
      }

      next();
    });
  } catch (e) {
    res.status(502).json({
      message: "error",
    });
    console.log(e);
  }
};

export default auth;
