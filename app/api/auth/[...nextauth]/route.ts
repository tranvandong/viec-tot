import ZaloProvider from "@/lib/auth/provider/zalo-provider";
import NextAuth from "next-auth";

export const GET = NextAuth({
  providers: [ZaloProvider()],
  callbacks: {
    async session({ session, token, user }) {
      console.log("token;:", token, user);
      (session as any).isLoginSuccess = (token as any).user.isLoginSuccess;
      return session;
    },
    async jwt({ token, user, account, profile }) {
      console.log(token, user, account, profile);

      if (user) {
        token.accessToken = user.id;
        token.user = user;
      }
      return token;
    },
  },
  // session: { strategy: "jwt" },
});
export const POST = NextAuth({
  providers: [ZaloProvider()],
});
