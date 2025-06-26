"use client";
import React, { createContext, useContext, useState, useCallback } from "react";
import { axiosInstance } from "../utils";
import { useRouter } from "next/navigation";
import { useApi, useCustom } from "@/hooks/useDataProvider";

const AuthContext = createContext({} as any);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(true);
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        handleUnauthorized();
        router.push("/");
      }
      return Promise.reject(error);
    }
  );
  // Hàm này sẽ được gọi khi có lỗi 401
  const handleUnauthorized = useCallback(() => {
    setAuthorized(false);
  }, []);

  // Hàm reset lại trạng thái (nếu cần)
  const resetAuth = useCallback(() => {
    setAuthorized(true);
  }, []);
  const apiUrl = useApi();
  const { data: applicantData } = useCustom({
    url: `${apiUrl}/buss/allow/Applicants/GetByUser`,
  });

  const { data: userInfoData } = useCustom<{
    isSuccessed: boolean;
    resultObj: {
      displayName: string;
      role: "HR" | "MEMBER";
    };
  }>({
    url: `${apiUrl}/default/allow/UserInfo/UserInfo`,
    method: "get",
    queryOptions: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  });

  return (
    <AuthContext.Provider
      value={{
        authorized,
        handleUnauthorized,
        resetAuth,
        applicant: applicantData?.data,
        userInfo: userInfoData?.data,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
