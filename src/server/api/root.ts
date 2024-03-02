import { authRouter } from "~/server/api/routers/authRouter";
import { createTRPCRouter } from "~/server/api/trpc";
import { photosRouter } from "./routers/photosRouter";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  photos: photosRouter,
});

export type AppRouter = typeof appRouter;
