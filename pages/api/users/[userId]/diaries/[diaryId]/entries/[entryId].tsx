import { NextApiRequest, NextApiResponse } from "next";

import { Diary, Entry, PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
import { handleErrors } from "../../../../../auth/login";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const prisma = new PrismaClient();
  const entryId = parseInt(req.query.entryId as string);
  if (req.method === "PUT") {
    try {
      const data = req.body as Partial<Entry>;
      const now = dayjs().toISOString();
      const entry = await prisma.entry.update({
        where: { id: entryId },
        data: { ...data, updatedAt: now },
      });

      return res.status(201).send(entry);
    } catch (error) {
      console.log(error);
      return res.status(500).send(handleErrors("Failed to update entry."));
    }
  } else return res.status(200).send(handleErrors("No such route found"));
};
