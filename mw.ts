// import { NextRequest, NextResponse } from "next/server";

// export function middleware(request: NextRequest) {
//   let url = request.nextUrl.clone();
//   const hostname = "viectot.nextform.vn";
//   const requestHeaders = new Headers(request.headers);

//   requestHeaders.set("host", hostname);

//   url.protocol = "https";
//   url.hostname = hostname;
//   url.port = "443";

//   return NextResponse.rewrite(url, {
//     headers: requestHeaders,
//   });
// }

// export const config = {
//   matcher: "/api/:path*",
// };

// export { auth as middleware } from "@/auth222";
