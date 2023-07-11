import { Plan } from "@prisma/client";
import { DefaultSession,DefaultUser } from "next-auth";
import { JWT,DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
    // interface Session {
    //     user: {
    //         plan: string
    //     } & DefaultSession
    // }

    interface User extends DefaultUser {
        plan: Plan
    } 
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        plan: Plan
    }
}