"use client";
import React, { createContext, useContext, useState, useCallback } from "react";
import { axiosInstance } from "../utils";
import { useRouter } from "next/navigation";

const AuthContext = createContext({} as any);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(true);

  // Hàm này sẽ được gọi khi có lỗi 401
  const handleUnauthorized = useCallback(() => {
    setAuthorized(false);
  }, []);

  // Hàm reset lại trạng thái (nếu cần)
  const resetAuth = useCallback(() => {
    setAuthorized(true);
  }, []);

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

  return (
    <AuthContext.Provider value={{ authorized, handleUnauthorized, resetAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
