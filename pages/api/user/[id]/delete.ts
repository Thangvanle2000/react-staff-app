import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    const param: any = req.query;

    const user = await prisma.user.findUnique({
      where: {
        id: +param.id,
      },
    });
    if (!user) {
      return res.status(401).json({
        status: "fail",
        message: "User not found",
      });
    } else {
      await prisma.user.delete({
        where: {
          id: +param.id,
        },
      });
      return res.status(200).json({
        message: "Delete Success",
        status: "success",
      });
    }
  } else {
    return res.status(405).json({ errorMessage: "405 Method Not Allowed" });
  }
}
