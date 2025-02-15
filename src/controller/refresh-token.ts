import jwt from "jsonwebtoken";
import { prismaClient } from "../application/database";
import { Request, Response } from "express";

export const refreshToken = async (req: Request, res: Response) => {
  try {
    console.log("Cookies:", req.cookies);
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(401);
    const user = await prismaClient.user.findFirst({
      where: {
        refresh_token: refreshToken,
      },
    });
    if (!user) return res.sendStatus(403);
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET ?? "",
      (err: unknown, decoded: unknown) => {
        if (err) return res.sendStatus(403);
        const id = user.id;
        const name = user.name;
        const email = user.email;
        const accessToken = jwt.sign(
          { id, name, email },
          process.env.ACCESS_TOKEN_SECRET ?? "",
          {
            expiresIn: "3600s",
          }
        );
        res.json({ accessToken });
      }
    );
  } catch (error) {
    console.log(error);
  }
};
