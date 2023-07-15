import { prisma } from "@/utils/prismaSingleton";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { getToken } from "next-auth/jwt";
const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "16MB", maxFileCount: 5 } })
    .middleware(async ({ req }) => {
      const token = await getToken({ req });
      if (token) {
        return { userId: token.userId };
      }
      throw new Error("Token is not provided");
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await prisma.photos.create({
        data: {
          url: file.url,
          size: file.size,
          userId: metadata.userId,
        },
      });
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
