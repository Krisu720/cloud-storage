import { prisma } from "@/utils/prismaSingleton";
import { NextResponse } from "next/server";
import { utapi} from "uploadthing/server";

interface Params {
  id: string;
}

export const DELETE = async (
  request: Request,
  { params }: { params: Params }
) => {
    // await utapi.deleteFiles("")

//   const { id } = params;
//   const res = await prisma.photos.findUnique({ where: { uuid: id } });

//   if(res) {
//       const utId = res.url.slice(26)
//       console.log(utId)
//       const utRes = await utapi.deleteFiles(utId);
//       if(utRes.success) {
//           await prisma.photos.delete({where:{uuid:id}})
//           return NextResponse.json({ message: "deleted" });
//       } else {
//           return NextResponse.json({message: "Failed to delete on provider bucket"})
//       }
//   } else {
//       return NextResponse.json({message: "Photo havent been found"})
//   }
};
