import { prisma } from "@/utils/prismaSingleton";
import { NextResponse } from "next/server";

export const GET = async () => {
  const res = await prisma.photos.findMany();
  return NextResponse.json(res);
};

