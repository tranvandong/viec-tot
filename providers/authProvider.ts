import { axiosInstance } from "./utils";
import { dataProvider } from "./dataProvider";
import { AuthBindings } from "./types/auth";
import { apiUrl } from "./dataProvider";

export const TOKEN_KEY = "invest-auth";
export const USER_KEY = "user";

const redirectTo = "/";

export const authProvider: AuthBindings = {
  login: async ({ username, email, password }) => {
    try {
      if ((username || email) && password) {
        const { data, ...rest } = await dataProvider.custom<{
          user: any;
          accessToken: string;
          expiresAt: string;
        }>({
          url: `${apiUrl}/auth/login`,
          payload: { username: username || email, password },
          method: "post",
        });

        if (rest.status === 401) {
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
          redirectTo,
          data,
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
      const { data, ...rest } = await dataProvider.custom({
        url: `${apiUrl}/auth/register`,
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
    await dataProvider.custom({ url: `/auth/logout`, method: "post" });
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
        url: `/auth/change-password`,
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
