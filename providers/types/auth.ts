export type CheckResponse = {
  authenticated: boolean;
  redirectTo?: string;
  logout?: boolean;
  error?: Error;
};

export type OnErrorResponse = {
  redirectTo?: string;
  logout?: boolean;
  error?: Error;
};

export type AuthActionResponse = {
  success: boolean;
  redirectTo?: string;
  error?: Error;
  [key: string]: unknown;
};

export type PermissionResponse = unknown;

export type IdentityResponse = unknown;

export type UserRole = "employer" | "candidate";

export type AuthBindings = {
  login: (params: {
    username: string;
    password: string;
    role: UserRole;
  }) => Promise<AuthActionResponse>;
  logout: () => Promise<AuthActionResponse>;
  register: (params: any) => Promise<AuthActionResponse>;
  forgotPassword?: (params: any) => Promise<AuthActionResponse>;
  updatePassword?: (params: any) => Promise<AuthActionResponse>;
  loginZalo?: (params: { accessToken: string }) => Promise<AuthActionResponse>;
  getPermissions?: (params?: any) => Promise<PermissionResponse>;
  getIdentity?: (params?: any) => Promise<IdentityResponse>;
};

export interface IAuthBindingsContext extends Partial<AuthBindings> {
  isProvided: boolean;
}
