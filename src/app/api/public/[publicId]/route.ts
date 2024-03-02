import { NextResponse } from "next/server";
// import Jimp from 'jimp'
// import path from "path";
import { db } from "~/server/db";
interface Params {
  publicId: string;
}

export const GET = async (request: Request, { params }: { params: Params }) => {
  const res = await db.photos.findFirst({
    where: { publicId: params.publicId },
  });
  if (!res)
    return NextResponse.json({ message: "Image not found" }, { status: 404 });

  const userRes = await db.user.findUnique({ where: { id: res.userId } });

  if (!userRes)
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  const getBlob = await fetch(res.url);
  let blob = await getBlob.blob();
  const arrayBuffer = await blob.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer)

  // const watermark = await Jimp.read(path.join("public","watermark2.png"))
  // const photo = await Jimp.read(buffer)
  // watermark.resize(photo.bitmap.width, photo.bitmap.height)
  // photo.composite(watermark, 0, 0)
  // const bufferPhoto = await photo.getBufferAsync(Jimp.MIME_PNG)
  

  const headers = new Headers();
  headers.set("Content-Type", "image/png");
  return new Response(buffer, { headers });

};
