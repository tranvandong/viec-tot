import ZaloProvider from "@/lib/auth/provider/zalo-provider";
import NextAuth from "next-auth";

export const GET = NextAuth({
  providers: [ZaloProvider()],
});
export const POST = NextAuth({
  providers: [ZaloProvider()],
});
