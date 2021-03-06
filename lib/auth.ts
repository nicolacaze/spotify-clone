import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "./prisma";

export const validateRoute = (handler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const { TRAX_ACCESS_TOKEN: token } = req.cookies;
    if (token) {
      let user;
      try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        user = await prisma.user.findUnique({ where: { id } });
        if (!user) {
          throw new Error("Not a real user");
        }
      } catch (error) {
        res.status(401).json({ error: "Not authorized" });
      }
      return handler(req, res, user);
    }
    res.status(401).json({ error: "Not authorized" });
  };
};

export const validateToken = (token) =>
  jwt.verify(token, process.env.JWT_SECRET);
