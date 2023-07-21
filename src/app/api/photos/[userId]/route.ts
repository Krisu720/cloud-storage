import { prisma } from "@/utils/prismaSingleton";
import { NextResponse } from "next/server";
interface Params {
  userId: string;
}
export const GET = async (request: Request, { params }: { params: Params }) => {
  const res = await prisma.user.findUnique({
    where: { id: params.userId },
    select: { photos: {distinct:"createdAt"} },
  });
  return NextResponse.json(res);
};
