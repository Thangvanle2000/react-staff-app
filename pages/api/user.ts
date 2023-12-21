import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, name, dob, gender, address } = req.body;
    const validationSchema = [
      {
        valid: validator.isEmail(email),
        errorMessage: "Email is invalid",
      },
    ];
    const errors: string[] = [];
    validationSchema.forEach((check) => {
      if (!check.valid) {
        errors.push(check.errorMessage);
      }
    });
    if (errors.length) {
      return res.status(400).json({ errorMessage: errors[0] });
    }
    if (Object.getOwnPropertyNames(req.body).length > 5) {
      return res.status(400).json({
        message: "Bad Request",
      });
    } else {
      try {
        const user = await prisma.user.create({
          data: {
            email: email,
            name: name,
            dob: dob,
            address: address,
            gender: gender,
          },
        });
        return res.status(200).json({
          status: "success",
          user,
        });
      } catch (error) {
        return res.status(401).json({
          status: "fail",
          error,
        });
      }
    }
  }
  if (req.method === "GET") {
    try {
      const user: any = await prisma.user.findMany({
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
