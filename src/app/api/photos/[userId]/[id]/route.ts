import { prisma } from "@/utils/prismaSingleton";
import { NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi({
  apiKey:
    process.env
      .sk_live_57c9fffe5db75bc2479d6614aaf4b91f82c1c2385f7d7641ce69fee4276aaf0b,
});

interface Params {
  id: string;
}

export const DELETE = async (
  request: Request,
  { params }: { params: Params }
) => {
  const { id } = params;
  const res = await prisma.photos.findUnique({ where: { uuid: id } });
  if (!res)
    return NextResponse.json({ message: "Photo not found" }, { status: 404 });

  const decoded = decodeURI(res.url);
  const output =
    decoded.split("https://uploadthing.com/f/")[1] === undefined
      ? decoded.split("https://utfs.io/f/")[1]
      : decoded.split("https://uploadthing.com/f/")[1];
  const uploadthingRes = await utapi.deleteFiles(output);

  if (uploadthingRes.success) {
    await prisma.photos.delete({ where: { uuid: id } });
    return NextResponse.json({ message: "Deleted" }, { status: 200 });
  } else {
    return NextResponse.json(
      {
        message: "Failed to delete on provider bucket",
      },
      { status: 500 }
    );
  }
};
