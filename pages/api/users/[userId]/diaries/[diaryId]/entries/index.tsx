import { NextApiRequest, NextApiResponse } from "next";

import { Entry, PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
import { handleErrors } from "../../../../../auth/login";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const prisma = new PrismaClient();
  const diaryId = parseInt(req.query.diaryId as string);

  if (req.method === "GET") {
    try {
      const entries = await prisma.entry.findMany({
        where: { diaryId: diaryId },
      });
      return res.send(entries);
    } catch (error) {
      console.log(error);
      return res.status(500).send(handleErrors("Failed to get entries."));
    }
  }
  if (req.method === "POST") {
    try {
      const { title, content } = req.body as Partial<Entry>;
      const now = dayjs().toISOString();
      const entry = await prisma.entry.create({
        data: {
          title,
          content,
          createdAt: now,
          updatedAt: now,
          diary: { connect: { id: diaryId } },
        },
      });

      const diary = await prisma.diary.update({
        data: { updatedAt: now },
        where: { id: diaryId },
      });

      return res.status(200).send({
        diary: diary,
        entry: entry,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send(handleErrors("Failed to create entry."));
    }
  } else return res.status(200).send(handleErrors("No such route found"));
};
