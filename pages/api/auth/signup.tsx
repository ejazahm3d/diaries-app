import { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";
import { generateToken, handleErrors } from "./login";
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const prisma = new PrismaClient();
  const { username, password, email } = req.body;
  const exUser = await prisma.user.findOne({ where: { username } });
  if (exUser) {
    return res
      .status(401)
      .json(handleErrors("Someone with that username already exists"));
  }
  const user = await prisma.user.create({
    data: {
      username,
      password,
      email,
    },
  });
  const token = generateToken();
  return res.status(201).json({
    user: user,
    token,
  });
};
