import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(request: NextRequest): NextResponse | undefined {
    if (request.nextUrl.pathname === "/") {
      // Redirect to the user's default organisation
      return NextResponse.redirect(new URL("/TEST/projects", request.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => Boolean(token),
    },
    pages: {
      signIn: "/auth/signin",
    },
  }
);
