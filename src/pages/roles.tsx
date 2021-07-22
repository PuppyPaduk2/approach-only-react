import { Role } from "@src/contexts/roles";
import { useApi } from "@src/hooks/api";
import { useLoadRoleList, useRoleList } from "@src/hooks/roles";
import { useCheckPermission } from "@src/hooks/user-settings";
import { PageHeader } from "@src/libs/ui-kit";
import { uuid } from "@src/libs/utils";
import { apiPaths } from "@src/settings/api-paths";
import { Button, Table } from "antd";
import { ColumnProps } from "antd/lib/table";
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";

export const PageRoles = memo(() => {
  const api = useApi();

  const [roleList] = useRoleList();
  const pendingLoadRoleListState = useState<boolean>(false);

  const [pendingAddRole, setPendingAddRole] = useState<boolean>(false);

  const loadRoleList = useLoadRoleList(pendingLoadRoleListState);

  const addRole = useCallback(() => {
    const role: Role = {
      cid: uuid(),
      name: "Role " + uuid().substr(-3, 3),
    };
    setPendingAddRole(true);
    api.post(apiPaths.roles, role)
      .finally(() => setPendingAddRole(false))
      .finally(loadRoleList);
  }, [api, loadRoleList]);

  const columns = useMemo<ColumnProps<Role>[]>(
    () => [
      { title: "Name", dataIndex: "name" },
    ],
    []
  );

  const isRoleWrite = useCheckPermission("roles.write");

  useEffect(() => {
    loadRoleList();
  }, [loadRoleList]);

  return (
    <>
      <PageHeader
        title="Roles"
        extra={(
          <>
            <Button disabled={!isRoleWrite} loading={pendingAddRole} onClick={addRole}>Add role</Button>
            <Button loading={pendingLoadRoleListState[0]} onClick={loadRoleList}>Reload</Button>
          </>
        )}
      />
      <Table
        size="small"
        rowKey="cid"
        loading={pendingLoadRoleListState[0]}
        dataSource={roleList}
        columns={columns}
      />
    </>
  );
});
