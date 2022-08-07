import jwt from "jsonwebtoken";
import { tokenPayloadT } from "../types";

const jwtHandler = (accessToken: string, decodeRefreshToken: tokenPayloadT) => {
  try {
    let newAccessToken = accessToken;

    jwt.verify(accessToken, process.env.SECRET as string, (error, decode) => {
      if (error?.message === "jwt expired") {
        newAccessToken = jwt.sign(
          { email: decodeRefreshToken.email },
          process.env.SECRET as string,
          {
            expiresIn: "10m",
          }
        );
      }
    });

    return newAccessToken;
  } catch (e) {
    console.log(e);
    return "";
  }
};

export default jwtHandler;
