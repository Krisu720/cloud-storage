import { prisma } from "@/utils/prismaSingleton";
import { NextResponse } from "next/server";
import { utapi } from "uploadthing/server";

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
    return NextResponse.json(
      { message: "Photo havent been found" },
      { status: 404 }
    );
  const utId = res.url.slice(26);

  const utRes = await utapi.deleteFiles(decodeURI(utId));

  if (utRes.success) {
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
