import { prisma } from "@/utils/prismaSingleton";
import { NextResponse } from "next/server";
interface Params {
  userId: string;
}
export const GET = async (request: Request, { params }: { params: Params }) => {
  const res = await prisma.user.findUnique({
    where: { id: params.userId },
    select: { photos: { orderBy: { createdAt: "asc" } } },
  });

  if (!res) return NextResponse.json({ message: "error" }, { status: 404 });

  let size: number = 0;
  let counter: number = 0;
  let sharedCounter: number = 0;
  res.photos.map((item) => {
    size = item.size + size;
    item.publicId && sharedCounter++;
    counter++;
  });
  
  return NextResponse.json({ size: size/1024/1024, number: counter,sharedNumber:sharedCounter });
};
