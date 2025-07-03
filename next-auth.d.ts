import "next-auth";

import { Applicant, UserInfo } from "@/providers/types/definition";
import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      accessToken: string;
      userInfo?: UserInfo;
      applicants?: Applicant[];
    } & DefaultSession["user"];
    // Add credentials to the session interface
    credentials?: {
      username: string;
      password: string;
    };
  }

  interface User {
    id: string;
    accessToken?: string; // Make accessToken optional to accommodate credentials provider
    userInfo?: UserInfo;
    applicants?: Applicant[];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    accessToken?: string; // Make accessToken optional
    userInfo?: UserInfo;
    applicants?: Applicant[];
    // Add username and password to the JWT token
    username?: string;
    password?: string;
  }
}
