import { Lucia, Session, User } from "lucia";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { db } from "./db";
import { cookies } from "next/headers";
import {GitHub} from 'arctic'
export interface DatabaseUserAttributes {
  id:string;
  email: string;
  githubId?: string;
  username?: string;
  image?: string;
}

declare module "Lucia" {
  interface Register {
    Lucia: typeof auth;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

export const github = new GitHub(process.env.GITHUB_ID!,process.env.GITHUB_SECRET!)

export const auth = new Lucia(new PrismaAdapter(db.session, db.user), {
  sessionCookie: {
    expires: false,
    attributes: {
      // set to `true` when using HTTPS
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes: (attributes) => {
    return {
      email: attributes.email,
      githubId: attributes.githubId ?? null,
      username: attributes.username ?? null,
      image: attributes.image ?? null,
    };
  },
});

type ValidateSession = {
  user: User | null;
  session: Session | null;
};

export const validateSession = async (): Promise<ValidateSession> => {
  const sessionId = cookies().get(auth.sessionCookieName)?.value ?? null;
  if (!sessionId) return { session: null, user: null };
  const { session, user } = await auth.validateSession(sessionId);
  if (session && session.fresh) {
    const cookie = auth.createSessionCookie(session.id);
    cookies().set(cookie.name, cookie.value, cookie.attributes);
  }
  if (!session) {
    const cookie = auth.createBlankSessionCookie();
    cookies().set(cookie.name, cookie.value, cookie.attributes);
  }
  return { session, user };
};

