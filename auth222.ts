import type { NextAuthOptions } from "next-auth";
import ZaloProvider from "@/lib/auth/provider/zalo-provider";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    ZaloProvider(),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (credentials) {
          // In a real application, you would validate credentials here
          // and return a user object from your database.
          // NextAuth expects a 'User' object with at least an 'id'.
          // We're including credentials directly in the user object to pass them to JWT and Session.
          return { id: credentials.username, ...credentials };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      console.log("JWT callback:", { token, user });

      if (user) {
        // Merge the user object (which contains credentials from authorize) into the token.
        // This makes credentials available in the session callback.
        return { ...token, ...user };
      }
      return token;
    },
    async session({ session, token, user }) {
      console.log("Session callback:", { session, token, user });
      session.user = token;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
