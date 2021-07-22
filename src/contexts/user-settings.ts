import { State } from "@src/libs/utils";
import { PermissionKey } from "@src/settings/permissions";
import { createContext } from "react";

export type UserSettings = {
  name: string;
  permissionList: PermissionKey[];
};

export const initialUserSettings: UserSettings = { name: "", permissionList: [] };

export const userSettingsContext = createContext<State<UserSettings>>(
  [initialUserSettings, () => {}]
);
