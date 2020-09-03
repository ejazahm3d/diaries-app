import { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const prisma = new PrismaClient();
  return res.send(await prisma.diary.findMany());
};
