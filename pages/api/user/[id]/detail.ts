import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const param: any = req.query;
    try {
      const user: any = await prisma.user.findUnique({
        where: {
          id: +param.id,
        },
        select: {
          id: true,
          email: true,
          name: true,
          dob: true,
          address: true,
          gender: true,
        },
      });

      return res.status(200).json({
        status: "success",
        data: user,
      });
    } catch (error) {
      return res.status(401).json({
        status: "fail",
        error,
      });
    }
  } else {
    return res.status(405).json({ errorMessage: "405 Method Not Allowed" });
  }
}
