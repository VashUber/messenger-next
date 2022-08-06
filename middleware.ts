import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  try {
    const reg = /static|\./;
    if (reg.test(req.nextUrl.pathname)) return NextResponse.next();

    const refreshToken = req.cookies.get("refreshToken") ?? "";
    const accessToken = req.cookies.get("accessToken") ?? "";

    switch (true) {
      case !refreshToken &&
        req.nextUrl.pathname !== "/signin" &&
        req.nextUrl.pathname !== "/signup":
        return NextResponse.redirect(new URL("/signin", req.url));
      case refreshToken &&
        accessToken &&
        (req.nextUrl.pathname === "/signin" ||
          req.nextUrl.pathname === "/signup"):
        return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  } catch (e) {
    console.log(e);
  }
}
