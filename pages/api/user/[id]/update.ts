import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const param: any = req.query;
    const { email, name, dob, gender, address } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        id: param.id,
      },
    });
    if (!user) {
      return res.status(401).json({
        status: "fail",
        message: "User not found",
      });
    } else {
      await prisma.user.update({
        where: {
          id: param.id,
        },
        data: {
          email: email,
          name: name,
          dob: dob,
          address: address,
          gender: gender,
        },
      });
      return res.status(200).json({
        message: "Update Success",
      });
    }
  } else {
    return res.status(405).json({ errorMessage: "405 Method Not Allowed" });
  }
}
