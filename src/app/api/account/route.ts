import { prisma } from "@/utils/prismaSingleton";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  const { email, password } = await req.json();
  const res = await prisma.user.create({ data: { email, password } });
};
