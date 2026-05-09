export {
  fetchAccount,
  fetchAccountSettings,
  updateAccount,
  updateAccountSettings,
} from "./api/settings.api";
export { default as SettingsPage } from "./routes/settings.index";
export type { Account, AccountProfile, SettingsData } from "./domain/settings.types";
