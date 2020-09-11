import { NextApiRequest, NextApiResponse } from "next";

import { Diary, PrismaClient } from "@prisma/client";
import { handleErrors } from "../../../auth/login";
import dayjs from "dayjs";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const prisma = new PrismaClient();
  const diaryId = parseInt(req.query.diaryId as string);
  const entryId = parseInt(req.query.entryId as string);

  if (req.method === "PUT") {
    try {
      const data = req.body as Partial<Diary>;
      const now = dayjs().toISOString();

      const updatedDiary = await prisma.diary.update({
        where: { id: diaryId },
        data: { ...data, updatedAt: now },
      });

      return res.status(201).send(updatedDiary);
    } catch (error) {
      return res.status(500).send(handleErrors("Failed to update Diary."));
    }
  } else return res.status(200).send(handleErrors("No such route found"));
};
