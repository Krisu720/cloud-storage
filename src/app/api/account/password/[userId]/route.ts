import { prisma } from "@/utils/prismaSingleton";
import { NextResponse } from "next/server";
import { z } from "zod";
import {hash,compare} from "bcrypt";
interface Params {
  userId: string;
}

const reqValidator = z.object({
  password: z.string(),
  newPassword: z.string(),
});

export const POST = async (
  request: Request,
  { params }: { params: Params }
) => {
  const body = await request.json();
  const { password, newPassword } = reqValidator.parse({ ...body });
  const res = await prisma.user.findUnique({ where: { id: params.userId } });

  if (!res)
    return NextResponse.json(
      {},
      { status: 404, statusText: "User not found." }
    );

  const isValid = await compare(password, res.password);

  if (!isValid)
    return NextResponse.json(
      {},
      { status: 401, statusText: "Wrong password." }
    );

  const crypted = await hash(
    newPassword,
    parseInt(process.env.BCRYPT_SALTS as string)
  );

  await prisma.user.update({
    where: { id: params.userId },
    data: { password: crypted },
  });

  return NextResponse.json({ message: "Changed Password." });
};
