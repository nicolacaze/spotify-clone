import { NextResponse } from "next/server";

const protectedRoutes = ["/", "/playlists", "/library"];

export default function middleware(req) {
  if (protectedRoutes.includes(req.nextUrl.pathname)) {
    const { TRAX_ACCESS_TOKEN: token } = req.cookies;
    if (!token) {
      return NextResponse.redirect("signin");
    }
  }
}
