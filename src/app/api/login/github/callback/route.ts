import { cookies } from "next/headers";
import { github, auth } from "~/server/auth";
import { db } from "~/server/db";

interface GitHubUser {
  id: number;
  login: string;
  avatar_url: string;
}
interface GitHubEmail {
  email: string;
  primary: boolean;
  verified: boolean;
  visibility: string | null;
}

const signIn = async (userId: string) => {
  const session = await auth.createSession(userId, {});
  const sessionCookie = auth.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
};

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const storedState = cookies().get("github_oauth_state")?.value ?? null;
  if (!code || !state || !storedState || state !== storedState) {
    return new Response(null, {
      status: 400,
    });
  }
  try {
    const tokens = await github.validateAuthorizationCode(code);
    const githubUserResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });
    const githubUser: GitHubUser = await githubUserResponse.json();

    const foundById = await db.user.findFirst({
      where: {
        githubId: githubUser.id,
      },
    });

    if (foundById) {
      await signIn(foundById.id);
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/",
        },
      });
    }

    const githubEmailsResponse = await fetch(
      "https://api.github.com/user/emails",
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      },
    );
    const githubUserEmails: GitHubEmail[] = await githubEmailsResponse.json();
    const primaryEmail = githubUserEmails.find((email) => email.primary);
    const githubEmail = primaryEmail?.email.toLowerCase();
    if (!githubEmail) throw new Error("No email found");
    const foundByEmail = await db.user.findFirst({
      where: {
        email: githubEmail,
      },
    });
    if (foundByEmail) {
      await db.user.update({
        where: { email: githubEmail },
        data: { githubId: githubUser.id },
      });
      await signIn(foundByEmail.id);
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/",
        },
      });
    } else {
      const createdUser = await db.user.create({
        data: {
          email: githubEmail,
          githubId: githubUser.id,
          username: githubUser.login,
          image: githubUser.avatar_url,
        },
      });
      await signIn(createdUser.id);
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/",
        },
      });
    }
  } catch (error) {
    return new Response(null, { status: 500 });
  }
}
