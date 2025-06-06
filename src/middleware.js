import { NextResponse } from "next/server";



export async function middleware(request) {
  console.log("✅ Middleware executed");

  const authToken = request.cookies.get("authToken")?.value;
  const pathname = request.nextUrl.pathname;

  const isAuthPage = pathname === "/api/login" || pathname === "/api/users";

  // ✅ If logged-in user tries to access login/signup → redirect to profile
  if (isAuthPage && authToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // ✅ If unauthenticated user tries to access secure routes
  const protectedPaths = ["/add-task", "/show-task", "/profile/user"];
  const isProtectedPath = protectedPaths.includes(pathname);

  if (isProtectedPath && !authToken) {
    console.log("❌ No authToken found in cookies for protected route");
    return NextResponse.redirect(new URL("/login", request.url));
  }


  // ✅ Log if token is found
  if (authToken) {
    console.log("✅ Token found:", authToken);
  }

  return NextResponse.next(); // continue normally
}

export const config = {
  matcher: ["/", "/api/:path*", "/login", "/signup", "/add-task", "/show-task", "/profile/user"],
};
