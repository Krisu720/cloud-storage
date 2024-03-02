import { createUploadthing, type FileRouter } from "uploadthing/next";
import { validateSession } from "~/server/auth";
import { db } from "~/server/db";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "16MB", maxFileCount: 10 } })
    .middleware(async ({ req }) => {
      const { user } = await validateSession();
      if (user) {
        return { userId: user.id };
      }
      throw new Error("Token is not provided");
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await db.photos.create({
        data: {
          url: file.url,
          name: file.name,
          size: file.size,
          userId: metadata.userId,
        },
      });
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
