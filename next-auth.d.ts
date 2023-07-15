import { Plan } from "@prisma/client";
import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
        plan: Plan,
        userId: string
    } & DefaultSession["user"]
  } 

  interface User extends DefaultUser {
    plan: Plan;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    userId: string;
    plan: Plan;
  }
}
