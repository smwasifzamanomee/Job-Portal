import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  try {
    const { pathname } = request.nextUrl;

    if (
      pathname.startsWith("/save-jobs") ||
      pathname.startsWith("/profile") || 
      pathname.startsWith("/create-jobs")
    ) {
      const token = request.cookies.get("authData");
      if (!token) {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }
    return NextResponse.next();
  } catch (error) {
    console.log("middleware error!", error);
  }
}

export const config = {
  matcher: ["/save-jobs", "/profile", "/create-jobs"],
};