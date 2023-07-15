import { prisma } from "@/utils/prismaSingleton";
import { v4 as uuid } from "uuid";
import { NextResponse } from "next/server";
interface Params {
  userId: string;
}
export const POST = async (
  request: Request,
  { params }: { params: Params }
) => {
  const { photoId } = await request.json();
  const res = await prisma.photos.update({
    where: { uuid: photoId },
    data: { publicId: uuid() },
  });
  return NextResponse.json({ ...res });
};

export const PATCH = async (
  request: Request,
  { params }: { params: Params }
) => {
  const { photoId }: { photoId: string } = await request.json();
  const res = await prisma.photos.update({
    where: { uuid: photoId },
    data: { publicId: null },
  });
  return NextResponse.json({ ...res });
};
