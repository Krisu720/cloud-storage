import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
   
    const header = request.headers.get("userId")?.split(" ")[1]
    const token = request.nextauth.token?.userId

    console.log("HEADER:",header,"TOKEN:",token)

    if (
      request.nextUrl.pathname.startsWith("/api/photos") &&
        header !== token
    ) {
      return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
    }

    if (
      request.nextUrl.pathname.startsWith("/api/account") &&
      request.headers.get("userId")?.split(" ")[1] !==
        request.nextauth.token?.userId
    ) {
      return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
    }


  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/api/photos/:path*","/api/account/photo/:path*"],
};
