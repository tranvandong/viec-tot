import {
  dataProvider,
  apiUrl,
  serverSideApiUrl,
} from "@/providers/dataProvider";
import { OAuthConfig, OAuthUserConfig } from "next-auth/providers/oauth";

export interface ZaloProfile {
  id: string;
  name: string;
  picture?: {
    data: {
      url: string;
    };
  };
}

export default function ZaloProvider<P extends ZaloProfile>(): OAuthConfig<P> {
  return {
    id: "zalo",
    name: "Zalo",
    type: "oauth",
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID!,
    clientSecret: process.env.NEXT_PUBLIC_ZALO_SECRET_KEY!,
    authorization: {
      url: "https://oauth.zaloapp.com/v4/permission",
      params: {
        app_id: process.env.NEXT_PUBLIC_ZALO_APP_ID!,
      },
    },
    checks: ["state", "pkce"],
    token: {
      async request(context) {
        const response = await fetch(
          "https://oauth.zaloapp.com/v4/access_token",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              secret_key: process.env.NEXT_PUBLIC_ZALO_SECRET_KEY!,
            },
            body: new URLSearchParams({
              app_id: process.env.NEXT_PUBLIC_ZALO_APP_ID!,
              grant_type: "authorization_code",
              code: context.params.code as string,
              code_verifier: context.checks.code_verifier as string,
            }),
          }
        );

        const tokens = await response.json();

        // const { data } = await dataProvider.custom({
        //   url: `${serverSideApiUrl}/default/public/UserApplicant/LoginByZalo`,
        //   method: "post",
        //   payload: { accessToken: tokens.access_token },
        //   meta: { config: { mode: "server" } },
        // });

        return {
          tokens: {
            access_token: tokens.access_token,
            refresh_token: tokens.refresh_token,
            expires_in: tokens.expires_in,
            // loginSuccess: data.isSuccessed,
          },
        };
      },
    },

    userinfo: {
      async request(context) {
        const accessToken = context.tokens.access_token;
        console.log("accessToken: ", accessToken);
        const response = await fetch(
          `https://graph.zalo.me/v2.0/me?access_token=${accessToken}&fields=id,name,picture,phone`
        );

        const user = await response.json();
        let isLoginSuccess = false;
        try {
          const { data } = await dataProvider.custom({
            url: `${serverSideApiUrl}/default/public/UserApplicant/LoginByZalo`,
            method: "post",
            payload: { accessToken },
            meta: { config: { mode: "server" } },
          });
          isLoginSuccess = data.isSuccessed;
        } catch (error) {}

        return {
          id: user.id,
          name: user.name,
          image: user.picture?.data?.url ?? null,
          isLoginSuccess,
        };
      },
    },
    profile(profile: ZaloProfile) {
      return profile;
    },
  };
}
