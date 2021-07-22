import { Role, roleListContext } from "@src/contexts/roles";
import { State } from "@src/libs/utils";
import { apiPaths } from "@src/settings/api-paths";
import { useCallback, useContext } from "react";
import { useApi } from "./api";

export const useRoleList = () => useContext(roleListContext);

export const useLoadRoleList = (pendingState?: State<boolean>) => {
  const api = useApi();
  const [, setRoleList] = useRoleList();
  const setPending = pendingState ? pendingState[1] : () => {};
  return useCallback(
    () => {
      setPending(true);
      return api.get<{ roleList: Role[] }>(apiPaths.roles)
        .then(({ data }) => setRoleList(data.roleList))
        .finally(() => setPending(false));
    },
    [api, setPending]
  );
}
