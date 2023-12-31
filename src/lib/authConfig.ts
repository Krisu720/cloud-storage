import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { prisma } from "../utils/prismaSingleton";
import { compare } from "bcrypt";
const authConfig: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
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

        const isPasswordValid = await compare(
          credentials.password,
          res.password
        );

        if (!isPasswordValid) return null;

        return {
          id: res.id,
          email: res.email,
          image: res.image,
          plan: res.plan,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
        return {
          ...token,
          ...session.user,
        };
      }

      if (user) {
        return {
          ...token,
          userId: user.id,
          plan: user.plan,
        };
      }
      return token;
    },
    session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          plan: token.plan,
          userId: token.userId,
        },
      };
    },
  },
};

export default authConfig;
