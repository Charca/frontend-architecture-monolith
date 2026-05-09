export {
  fetchSession,
  login,
  logout,
  switchAccount,
  type LoginPayload,
  type SwitchAccountPayload,
} from "./api/auth.api";
export {
  fetchAccountPermissions,
  fetchAccountUser,
  fetchAccountUsers,
  updateAccountPermissions,
  updateAccountUser,
} from "./api/account-access.api";
export { fetchProfile, updateProfile } from "./api/profile.api";
export { AvatarField } from "./components/avatar-field";
export {
  ALL_PERMISSIONS,
  clearStoredAuthToken,
  DEFAULT_PERMISSION_POLICY,
  getStoredAuthToken,
  getViewPermissionForPath,
  ORDERED_APP_PATHS,
  PERMISSION_GROUPS,
  ROLE_LABELS,
  setStoredAuthToken,
  VIEW_PERMISSION_BY_PATH,
} from "./lib/auth";
export { AuthProvider } from "./providers/auth-provider";
export { AuthContext, useAuth, type AuthContextValue } from "./providers/use-auth";
export { default as LoginPage } from "./routes/login/login";
export { default as ProfilePage } from "./routes/profile/profile.index";
export { default as RolesPermissionsPage } from "./routes/users/roles-permissions";
export { default as UserDetailPage } from "./routes/users/users.detail";
export { default as UsersPage } from "./routes/users/users.index";
export type {
  AccountMember,
  AccountPermissionPolicy,
  AuthSession,
  AuthUser,
  PermissionKey,
  RoleKey,
  SessionMembership,
} from "./domain/identity.types";
