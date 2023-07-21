import { prisma } from "@/utils/prismaSingleton";
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

  const getImgUrl = await prisma.photos.findUnique({
    where: { uuid: photoId },
  });

  if (!getImgUrl)
    return NextResponse.json({ message: "Image not found." }, { status: 404 });

  const res = await prisma.user.update({
    where: { id: params.userId },
    data: { image: getImgUrl.url },
  });
  
  return NextResponse.json({ image: res.image });
};
