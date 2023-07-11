import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { prisma } from "./prismaSingleton";

const authConfig: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/",
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "email",
          placeholder: "example@example.com",
          type: "email",
        },
        password: {
          label: "password",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const res = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!res) return null;

        if (res.password !== credentials.password) return null;

        return {
          id: res.id,
          email: res.email,
          image: res.image,
          plan: res.plan,
        };
      },
    }),
  ],
};

export default authConfig;
