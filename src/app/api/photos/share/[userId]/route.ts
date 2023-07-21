import { prisma } from "@/utils/prismaSingleton";
import { v4 as uuid } from "uuid";
import { NextResponse } from "next/server";
import { z } from "zod";
interface Params {
  userId: string;
}

const reqValidator = z.object({
  photoId: z.string(),
});

export const POST = async (
  request: Request,
  { params }: { params: Params }
) => {
  const body = await request.json();
  const { photoId } = reqValidator.parse(body);
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
  const body = await request.json();
  const { photoId } = reqValidator.parse(body);
  const res = await prisma.photos.update({
    where: { uuid: photoId },
    data: { publicId: null },
  });
  return NextResponse.json({ ...res });
};
