import { prisma } from "@/utils/prismaSingleton";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { hash } from "bcrypt";

const reqValidator = z.object({
  email: z.string(),
  password: z.string(),
});

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const { email, password } = reqValidator.parse({ ...body });
  const hashedPassword = await hash(
    password,
    parseInt(process.env.BCRYPT_SALTS as string)
  );
  try {
    await prisma.user.create({ data: { email, password: hashedPassword } });
  } catch (e) {
    return NextResponse.json(
      {},
      { status: 500, statusText: "Account with this email exists." }
    );
  }
  return NextResponse.json({ message: "Account created." });
};
