import { prisma } from "@/utils/prismaSingleton";
import { NextResponse } from "next/server";
interface Params {
  userId: string;
}
export const POST = async (request: Request, { params }: { params: Params }) => {
  const {photoId}: {photoId:string} = await request.json()
  const getImgUrl = await prisma.photos.findUnique({where:{uuid: photoId}})
  if(!getImgUrl) return NextResponse.json({message: "image not found"},{status:404})

  const xd = await prisma.user.update({where: {id: params.userId},data: {image: getImgUrl.url}})
  return NextResponse.json({message: "image changed"});
};
