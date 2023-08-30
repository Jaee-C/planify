import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";

export default withAuth(
  async function middleware(request: NextRequest) {
    const session = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!session) {
      return NextResponse.redirect(new URL("/auth/signin", request.url));
    }

    if (request.nextUrl.pathname === "/") {
      // Redirect to the user's default organisation
      console.log("Go to default org");
      const res = await fetch(
        new URL(`/api/default?user=${session.id}`, request.url),
        {
          method: "GET",
        }
      );

      if (res === null || !res.ok) {
        return NextResponse.redirect(new URL("/neworganisation", request.url));
      }

      const org = await res.json();
      const orgKey = org.key;

      return NextResponse.redirect(new URL(`/${orgKey}/projects`, request.url));
    }
    return NextResponse.next();
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

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - auth (authentication routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!auth|_next/static|_next/image|favicon.ico).*)",
  ],
};
