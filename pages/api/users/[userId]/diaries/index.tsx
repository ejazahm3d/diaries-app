import { NextApiRequest, NextApiResponse } from "next";

import { Diary, PrismaClient } from "@prisma/client";
import { handleErrors } from "../../../auth/login";
import dayjs from "dayjs";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const prisma = new PrismaClient();
  const userId = parseInt(req.query.userId as string);
  if (req.method === "GET") {
    try {
      return res.send(
        await prisma.diary.findMany({
          where: { userId: userId },
        })
      );
    } catch (error) {
      console.log(error);
      return res.status(500).send(handleErrors("Failed to get Diaries."));
    }
  }
  if (req.method === "POST") {
    try {
      const { title, type } = req.body as Partial<Diary>;
      const exUser = await prisma.user.findOne({ where: { id: userId } });
      if (!exUser) {
        return res.status(404).send(handleErrors("No such user exists."));
      }
      const now = dayjs().toISOString();
      const diary = await prisma.diary.create({
        data: {
          title,
          type,
          createdAt: now,
          updatedAt: now,
          user: { connect: { id: userId } },
        },
      });
      return res.status(201).send({
        user: {
          ...exUser,
        },
        diary: diary,
      });
    } catch (error) {
      return res.status(500).send(handleErrors("Failed to create Diary."));
    }
  } else return res.status(200).send(handleErrors("No such route found"));
};
