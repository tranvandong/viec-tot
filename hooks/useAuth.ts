import { useMutation, useQuery } from "@tanstack/react-query";
import { authProvider } from "../providers/authProvider";
import { useToast } from "./use-toast";
import { useRouter } from "next/navigation";
import { UserRole } from "@/providers/types/auth";
// Đăng nhập
export function useLogin(role: UserRole) {
  const { toast } = useToast();
  const router = useRouter();
  return useMutation({
    mutationFn: (params: { username: string; password: string }) =>
      authProvider.login({
        username: params.username,
        password: params.password,
        role,
      }),
    onSuccess(data) {
      if (data?.success) {
        router.push(data.redirectTo || "/");
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
  return useMutation({
    mutationFn: async (params: any) => authProvider.register(params),
    onSuccess(data: any) {
      if (data?.success) {
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
    mutationFn: () => authProvider.logout(),
    onSuccess() {
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
