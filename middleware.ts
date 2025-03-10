import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// This middleware handles protected routes and redirects based on user role
export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const { token } = req.nextauth;
    // console.log("token",token)
    
    // ถ้าอยู่ที่ /login และมี token แล้ว (login แล้ว) ให้ redirect ไปตาม role
    if (pathname === "/login" && token) {
      if (token.role === "admin") {
        return NextResponse.redirect(new URL("/admin/dashboard", req.url));
      }
      if (token.role === "user") {
        return NextResponse.redirect(new URL("/users/request", req.url));
      }
    }
    
    // Redirect admin routes if not admin
    if (pathname.startsWith("/admin") && token?.role !== "admin") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    
    // Redirect user routes if not user
    if (pathname.startsWith("/users") && token?.role !== "user") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;
        
        // ถ้าเป็นหน้า login ให้ผ่านไปก่อน (ไม่ต้องมี token ก็ได้)
        if (pathname === "/login") return true;
        
        // ถ้าเป็นหน้าอื่นต้องมี token (ต้อง login แล้ว)
        return !!token;
      },
    },
  }
);

// Specify which routes middleware applies to
export const config = {
  matcher: [
    '/admin/:path*',
    '/users/:path*',
    '/login',  // เพิ่ม /login เข้าไปใน matcher
  ],
};