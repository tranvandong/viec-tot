import { axiosInstance } from "./utils";
import { dataProvider, apiUrl } from "./dataProvider";
import { AuthBindings } from "./types/auth";

export const TOKEN_KEY = "invest-auth";
export const USER_KEY = "user";

const redirectTo = "/employer";

export const authProvider: AuthBindings = {
  login: async ({ username, password, role = "candidate" }) => {
    try {
      console.log("role:", role);
      const endPoint =
        role === "candidate"
          ? "/admin/public/Authenticate/Login"
          : "/admin/public/Authenticate/LoginAccountOrganization";
      if (username && password) {
        const { data, ...rest } = await dataProvider.custom<{
          isSuccessed: boolean;
          message: string;
        }>({
          url: `${apiUrl}${endPoint}`,
          payload: { username: username, password },
          method: "post",
        });

        if (!data.isSuccessed) {
          return {
            success: false,
            error: {
              name: "LoginError",
              message: "Tài khoản hoặc mật khẩu không đúng",
            },
          };
        }

        return {
          success: true,
          redirectTo: role === "candidate" ? "/" : "/employer/manage/jobs",
        };
      }

      return {
        success: false,
        error: {
          name: "LoginError",
          message: "Invalid username or password",
        },
      };
    } catch (error: any) {
      return {
        success: false,
        error: {
          name: "LoginError",
          message: error?.message || "Đã có lỗi xảy ra",
        },
      };
    }
  },
  register: async (params) => {
    try {
      const { data, ...rest } = await dataProvider.custom<{
        isSuccessed: boolean;
      }>({
        url: `${apiUrl}/default/public/UserApplicant/CreateMember`,
        payload: params,
        method: "post",
      });

      if (rest.status === 409) {
        return {
          success: false,
          error: {
            name: "RegisterError",
            message: "Tài khoản đã tồn tại",
          },
        };
      }
      if (!data.isSuccessed) {
        return {
          success: false,
          error: {
            name: "RegisterError",
            message: "Error",
          },
        };
      }
      return {
        success: true,
        redirectTo,
        data,
      };
    } catch (error: any) {
      return {
        success: false,
        error: {
          name: "RegisterError",
          message: error?.message || "Đã có lỗi xảy ra trong quá trình đăng ký",
        },
      };
    }
  },
  logout: async () => {
    await dataProvider.custom({
      url: `${apiUrl}/admin/allow/Authenticate/Logout`,
      method: "delete",
    });
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  getPermissions: async () => null,
  getIdentity: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    const user = localStorage.getItem(USER_KEY);
    if (token) {
      return { firstName: "Ronaldo", lastName: "Messi" };
    }
    return null;
  },
  updatePassword: async (params: any) => {
    try {
      await dataProvider.custom({
        url: `${apiUrl}/auth/change-password`,
        payload: params,
        method: "post",
      });
      return {
        success: true,
        // redirectTo: redirectPath,
        successNotification: {
          message: "Update password successful",
          description: "You have successfully updated password.",
        },
      };
    } catch (err) {
      return {
        success: false,
        error: {
          name: "Lỗi đổi mật khẩu",
          message: "Mật khẩu cũ không chính xác",
        },
      };
    }
  },
};

export { axiosInstance };
