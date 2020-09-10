import { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient, User } from "@prisma/client";
import { randomBytes } from "crypto";

export interface AuthResponse {
  token: string;
  user: User;
}

export const generateToken = () => randomBytes(8).toString("hex");
export const handleErrors = (message = "An error ocurred") => {
  return JSON.stringify({
    data: {
      message,
      isError: true,
    },
  });
};
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const prisma = new PrismaClient();
  console.log(req.body);
  const { username, password } = req.body;
  const user = await prisma.user.findOne({ where: { username } });
  if (!user) {
    return res
      .status(401)
      .json(handleErrors("Please enter valid username or password"));
  }

  if (password !== user.password) {
    return res
      .status(401)
      .json(handleErrors("Please enter valid username or password"));
  }

  const token = await generateToken();
  return res.status(200).json({
    user: user,
    token,
  });
};
