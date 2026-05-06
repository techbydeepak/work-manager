import { NextResponse } from "next/server";

export async function middleware(request) {

  console.log("✅ Middleware executed");

  const authToken = request.cookies.get("authToken")?.value;
  const pathname = request.nextUrl.pathname;

  // 🚫 Skip all API routes
  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // Protected frontend routes
  const protectedPaths = [
    "/add-task",
    "/show-task",
    "/profile/user",
  ];

  const isProtectedPath = protectedPaths.includes(pathname);

  // Redirect unauthenticated users
  if (isProtectedPath && !authToken) {

    console.log("❌ No authToken found");

    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  // Redirect logged-in users away from login/signup
  const authPages = ["/login", "/signup"];

  if (authPages.includes(pathname) && authToken) {
    return NextResponse.redirect(
      new URL("/", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/add-task",
    "/show-task",
    "/profile/user",
    "/login",
    "/signup",
  ],
};