import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { auth, validateSession } from "~/server/auth";
import { cookies } from "next/headers";
import { TRPCError } from "@trpc/server";
import { compare, hash } from "bcrypt";

export const authRouter = createTRPCRouter({
  register: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(5),
      })
    )
    .mutation(async ({ ctx: { db, headers }, input: { email, password } }) => {
      const user = await db.user.findUnique({
        where: { email: email.toLowerCase() },
      });
      if (user)
        throw new TRPCError({
          message: "User already exists.",
          code: "CONFLICT",
        });
      const hashedPassword = await hash(
        password,
        parseInt(process.env.BCRYPT_SALTS as string)
      );
      const newUser = await db.user.create({
        data: { email: email.toLowerCase(), password: hashedPassword },
      });
      const session = await auth.createSession(newUser.id, {});
      const sessionCookie = auth.createSessionCookie(session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }),
  login: publicProcedure
    .input(z.object({ email: z.string().email(), password: z.string() }))
    .mutation(async ({ ctx: { db }, input: { email, password } }) => {
      const user = await db.user.findUnique({
        where: { email: email.toLowerCase() },
      });
      if (!user)
        throw new TRPCError({ message: "User not found.", code: "NOT_FOUND" });
      if (!user.password)
        throw new TRPCError({
          message: "Use primary sign in method.",
          code: "CONFLICT",
        });

      const isPasswordValid = await compare(password, user.password);

      if (!isPasswordValid)
        throw new TRPCError({
          message: "Wrong password.",
          code: "BAD_REQUEST",
        });
      const session = await auth.createSession(user.id, {});
      const sessionCookie = auth.createSessionCookie(session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
      const {user:returnedUser} = await validateSession()
      return returnedUser
    }),
  lougout: publicProcedure.mutation(async ({ ctx }) => {
    if (!ctx.session)
      throw new TRPCError({ message: "Unauthorized.", code: "UNAUTHORIZED" });
    await auth.invalidateSession(ctx.session.id);
    const blankCookieSession = auth.createBlankSessionCookie();
    cookies().set(
      blankCookieSession.name,
      blankCookieSession.value,
      blankCookieSession.attributes
    );
  }),
  changePassword: protectedProcedure
    .input(
      z.object({
        oldPassword: z.string().min(5),
        newPassword: z.string().min(5),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: { id: ctx.user.id },
      });
      if (!user)
        throw new TRPCError({ message: "User not found.", code: "NOT_FOUND" });
      if (!user.password)
        throw new TRPCError({
          message: "Use primary sign in method.",
          code: "CONFLICT",
        });

      const isValid = await compare(input.oldPassword, user.password);

      if (!isValid)
        throw new TRPCError({
          message: "Wrong password.",
          code: "BAD_REQUEST",
        });

      const hashedPassword = await hash(
        input.newPassword,
        parseInt(process.env.BCRYPT_SALTS as string)
      );
      await ctx.db.user.update({
        where: { id: user.id },
        data: { password: hashedPassword },
      });
    }),
  changeImage: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      await ctx.db.user.update({
        where: { id: ctx.user.id },
        data: { image: input },
      });
    }),
  getUserSessions: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findUnique({
      where: { id: ctx.user.id },
      include: { sessions: true },
    });
    if (!user)
      throw new TRPCError({ message: "User not found.", code: "NOT_FOUND" });

    return user.sessions;
  }),
  getUser: protectedProcedure.query(async ({ ctx }) => {
    return ctx.user;
  }),
  getUserInfo: protectedProcedure.query(async ({ ctx }) => {
    const res = await ctx.db.user.findUnique({
      where: { id: ctx.user.id },
      select: { photos: { orderBy: { createdAt: "asc" } } },
    });
  
    if (!res) throw Error("Personal info not found.");
  
    let size: number = 0;
    let counter: number = 0;
    let sharedCounter: number = 0;
    res.photos.forEach((item) => {
      size = item.size + size;
      item.publicId && sharedCounter++;
      counter++;
    });
  
    return {
      size: size / 1024 / 1024,
      number: counter,
      sharedNumber: sharedCounter,
    };
  })
});
