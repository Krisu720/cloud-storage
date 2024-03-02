import { UTApi } from "uploadthing/server";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { v4 as uuid } from "uuid";

export const photosRouter = createTRPCRouter({
  getPhotos: protectedProcedure.query(async ({ ctx }) => {
    const photos = await ctx.db.user.findUnique({
      where: { id: ctx.user.id },
      select: { photos: { distinct: "createdAt" } },
    });
    return photos;
  }),
  deletePhotos: protectedProcedure
    .input(z.string().array())
    .mutation(async ({ ctx, input }) => {
      const utapi = new UTApi({ apiKey: process.env.UPLOADTHING_SECRET });
      const res = await ctx.db.photos.findMany({
        where: { uuid: { in: input } },
      });
      if (!res)
        throw new TRPCError({
          message: "Photos not found.",
          code: "NOT_FOUND",
        });
      if (res.length !== input.length)
        throw new TRPCError({ message: "Error occured.", code: "BAD_REQUEST" });

      const decodedArray = res.map((photo) => decodeURI(photo.url));
      const output = decodedArray.map((decoded) => {
        return decoded.split("https://uploadthing.com/f/")[1] === undefined
          ? decoded.split("https://utfs.io/f/")[1]
          : decoded.split("https://uploadthing.com/f/")[1];
      });
      //   @ts-ignore
      const uploadthingRes = await utapi.deleteFiles(output);

      if (uploadthingRes.success) {
        await ctx.db.photos.deleteMany({ where: { uuid: { in: input } } });
      } else {
        throw new TRPCError({
          message: "Failed to delete on provider bucket",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),
  deletePhoto: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const utapi = new UTApi({
        apiKey: process.env.UPLOADTHING_SECRET,
      });
      const res = await ctx.db.photos.findUnique({ where: { uuid: input } });
      if (!res)
        throw new TRPCError({ message: "Photo not found.", code: "NOT_FOUND" });

      const decoded = decodeURI(res.url);
      const output =
        decoded.split("https://uploadthing.com/f/")[1] === undefined
          ? decoded.split("https://utfs.io/f/")[1]
          : decoded.split("https://uploadthing.com/f/")[1];
      //   @ts-ignore
      const uploadthingRes = await utapi.deleteFiles(output);

      if (uploadthingRes.success) {
        await ctx.db.photos.delete({ where: { uuid: input } });
      } else {
        throw new TRPCError({
          message: "Failed to delete on provider bucket",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),
  setPublicPhoto: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const photo = await ctx.db.photos.update({
        where: { uuid: input },
        data: { publicId: uuid() },
      });
      return photo;
    }),
  removePublicPhoto: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const photo = await ctx.db.photos.update({
        where: { uuid: input },
        data: { publicId: null },
      });
      return photo;
    }),
  getSharedPhoto: publicProcedure.input(z.string()).query(async ({ctx,input}) => {
    const res = ctx.db.photos.findFirst({where:{publicId:input}})
    return res
  }),
});
