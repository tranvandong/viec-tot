"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { signIn as nextAuthSignIn, signOut, useSession } from "next-auth/react";
import { useApi } from "@/hooks/useDataProvider";
import { apiUrl, dataProvider } from "@/providers/dataProvider";
import { Applicant, UserInfo } from "../types/definition";
import { axiosInstance } from "../utils/axios";
import { useRouter } from "next/navigation";

interface AuthContextType {
  session: any;
  userInfo?: UserInfo;
  applicant?: Applicant;
  isLoading: boolean;
  authorized: boolean;
  establishSession: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  console.log("status:", status, "session:", session);

  const router = useRouter();
  const [userInfo, setUserInfo] = useState<UserInfo | undefined>();
  const [applicant, setApplicant] = useState<Applicant | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  const authorized = status === "authenticated";

  const logout = useCallback(async () => {
    await signOut({ redirect: false });
    router.push("/login");
  }, [router]);

  const establishSession = useCallback(async () => {
    setIsLoading(true);
    try {
      const userInfoRes = await dataProvider.custom<{
        isSuccessed: boolean;
        resultObj: UserInfo;
      }>({
        url: `${apiUrl}/default/allow/UserInfo/UserInfo`,
        method: "get",
      });

      let applicantsRes: { data: Applicant } | undefined;
      if (userInfoRes.data?.resultObj?.role === "MEMBER") {
        try {
          applicantsRes = await dataProvider.custom<Applicant>({
            url: `${apiUrl}/buss/allow/Applicants/GetByUser`,
            method: "get",
          });
        } catch (applicantError) {
          console.log("Failed to fetch applicant data:", applicantError);
          // Continue without applicant data if fetch fails
        }
      }

      if (userInfoRes.data) {
        setUserInfo(userInfoRes.data.resultObj);
        if (applicantsRes?.data) {
          setApplicant(applicantsRes.data);
        }
        console.log(
          "User has a valid session cookie, establishing session...",
          userInfoRes.data,
          applicantsRes?.data
        );

        await nextAuthSignIn("credentials", {
          ...userInfoRes.data.resultObj,
          ...(applicantsRes?.data && applicantsRes.data),
          redirect: false,
        });
      }
    } catch (error) {
      console.log("User does not have a valid session cookie.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const interceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status === 401) {
          logout();
        }
        return Promise.reject(error);
      }
    );
    console.log("status:", status);

    if (status === "authenticated") {
      console.log("Session is unauthenticated, establishing session...");

      establishSession();
    } else if (status !== "loading") {
      setIsLoading(false);
    }

    return () => {
      axiosInstance.interceptors.response.eject(interceptor);
    };
  }, [status, logout, establishSession]);

  return (
    <AuthContext.Provider
      value={{
        session,
        userInfo,
        applicant,
        isLoading,
        authorized,
        establishSession,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
