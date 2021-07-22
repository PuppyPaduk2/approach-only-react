import { UserSettings, userSettingsContext } from "@src/contexts/user-settings";
import { apiPaths } from "@src/settings/api-paths";
import { PermissionKey } from "@src/settings/permissions";
import { useContext, useEffect, useState } from "react";
import { useApi } from "./api";
import { useNonce } from "./token";

export const useUserSettings = () => useContext(userSettingsContext);

export const useSetupUserSettings = () => {
  const api = useApi();
  const [nonce] = useNonce();
  const [, setUserSettings] = useUserSettings();
  const [pending, setPending] = useState<boolean>(true);

  useEffect(() => {
    if (nonce) {
      setPending(true);
      api.get<{ userSettings: UserSettings }>(apiPaths.userSettings)
        .then(({ data }) => setUserSettings(data.userSettings))
        .finally(() => setPending(false));
    } else {
      setPending(false);
    }
  }, [api, nonce]);

  return pending;
};

export const useCheckPermission = (permissionKey: PermissionKey) => {
  const [{ permissionList }] = useUserSettings();
  return permissionList.includes(permissionKey);
};
