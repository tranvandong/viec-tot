import { useMutation, useQuery } from "@tanstack/react-query";
import { authProvider } from "../providers/authProvider";
import { useToast } from "./use-toast";
import { useRouter } from "next/navigation";
import { AuthActionResponse, UserRole } from "@/providers/types/auth";
import { signOut } from "next-auth/react";
// Đăng nhập
import { dataProvider } from "@/providers/dataProvider";

import { useAuth } from "@/providers/contexts/AuthProvider";

export function useLogin(role: UserRole) {
  const { toast } = useToast();
  const { establishSession } = useAuth();
  const router = useRouter();
  return useMutation({
    mutationFn: (params: { username: string; password: string }) =>
      authProvider.login({
        username: params.username,
        password: params.password,
        role,
      }),
    onSuccess(data) {
      console.log("Login response:", data);

      if (data?.success) {
        // Instead of redirecting, call the function to fetch data and create the session
        establishSession().then(() => {
          router.push(data.redirectTo || "/");
        });
      } else {
        toast({
          description:
            data?.error?.message || "Tài khoản hoặc mật khẩu không đúng",
          title: "Đăng nhập thất bại",
          type: "foreground",
          variant: "warning",
        });
      }
    },
    onError: (error: any) => {
      toast({
        description: error?.message || "Đã có lỗi trong quá trình đăng nhập",
        title: "Đăng nhập thất bại",
        type: "foreground",
        variant: "destructive",
      });
    },
  });
}

// Đăng ký
export function useRegister() {
  const { toast } = useToast();

  const router = useRouter();
  return useMutation({
    mutationFn: async (params: any) => authProvider.register(params),
    onSuccess(data: AuthActionResponse) {
      console.log(data);

      if (data.success) {
        router.push("/login");
        toast({
          description: "Đăng ký tài khoản thành công",
          title: "Đăng ký thành công",
          variant: "success",
        });
      } else {
        toast({
          description: data?.error?.message || "Đăng ký thất bại",
          title: "Đăng ký thất bại",
          variant: "warning",
        });
      }
    },
    onError: (error: any) => {
      toast({
        description: error?.message || "Đã có lỗi trong quá trình đăng ký",
        title: "Đăng ký thất bại",
        variant: "destructive",
      });
    },
  });
}

// Đăng xuất
export function useLogout() {
  const router = useRouter();
  return useMutation({
    mutationFn: authProvider.logout,
    async onSuccess() {
      // After the backend cookie is cleared, sign out of the NextAuth session
      await signOut({ redirect: false });
      router.push("/");
    },
  });
}

// Lấy quyền
export function useGetPermissions() {
  return useQuery({
    queryKey: ["auth", "permissions"],
    queryFn: () => {
      if (authProvider && typeof authProvider.getPermissions === "function") {
        return authProvider.getPermissions();
      }
      return Promise.reject(
        new Error("authProvider.getPermissions is not available")
      );
    },
  });
}

// Lấy thông tin user
export function useGetIdentity(params: any) {
  return useQuery({
    queryKey: ["auth", "identity"],
    queryFn: () => {
      if (authProvider && typeof authProvider.getIdentity === "function") {
        return authProvider.getIdentity(params);
      }
      return Promise.reject(
        new Error("authProvider.getIdentity is not available")
      );
    },
  });
}

// Đổi mật khẩu
export function useUpdatePassword() {
  return useMutation({
    mutationFn: (params: any) => {
      if (authProvider && typeof authProvider.updatePassword === "function") {
        return authProvider.updatePassword(params);
      }
      return Promise.reject(
        new Error("authProvider.updatePassword is not available")
      );
    },
  });
}
