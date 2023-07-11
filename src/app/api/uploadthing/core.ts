import { prisma } from "@/utils/prismaSingleton";
import { createUploadthing, type FileRouter } from "uploadthing/next";
const f = createUploadthing();

const auth = (req: Request) => ({ id: "fakeId" }); // Fake auth function

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "16MB",maxFileCount: 5 } })
    .middleware(async ({ req}) => {
      const user = await auth(req);
      if (!user) throw new Error("Unauthorized");
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await prisma.photos.create({ data: { url: file.url,size: file.size,userId: "86b40653-caaa-406d-a4e1-c3cf03489216" } });
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
