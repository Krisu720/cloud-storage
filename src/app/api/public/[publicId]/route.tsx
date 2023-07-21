import { prisma } from "@/utils/prismaSingleton";
import { ImageResponse } from "next/server";
import { NextResponse } from "next/server";
interface Params {
  publicId: string;
}
export const GET = async (request: Request, { params }: { params: Params }) => {
  const res = await prisma.photos.findFirst({
    where: { publicId: params.publicId },
  });
  if (!res)
    return NextResponse.json({ message: "blob not found" }, { status: 404 });

  const userRes = await prisma.user.findUnique({ where: { id: res.userId } });

  if (!userRes)
    return NextResponse.json({ message: "user not found" }, { status: 404 });
  const getBlob = await fetch(res.url);
  const blob = await getBlob.blob();

  const headers = new Headers();
  headers.set("Content-Type", "image/png");

  return new Response(blob, { headers });
 
};
