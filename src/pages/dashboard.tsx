import { useLoadRoleList, useRoleList } from "@src/hooks/roles";
import { Card, Col, Row, Statistic } from "antd";
import React, { FC, useEffect, useState } from "react";

export const PageDashboard: FC = () => {
  const [roleList] = useRoleList();

  const pendingLoadRoleListState = useState<boolean>(false);
  const loadRoleList = useLoadRoleList(pendingLoadRoleListState);

  useEffect(() => {
    loadRoleList();
  }, [loadRoleList]);

  return (
    <Row gutter={[16, 16]}>
      <Col span={12}>
        <Card loading={pendingLoadRoleListState[0]}>
          <Statistic title="Count roles" value={roleList.length} />
        </Card>
      </Col>
      <Col span={12}>
        <Card loading={pendingLoadRoleListState[0]}>
          <Statistic title="Account Balance" value={112893} precision={2} />
        </Card>
      </Col>
      <Col span={24}>
        <Card loading={pendingLoadRoleListState[0]}>
          <Statistic title="Account Balance" value={112893} precision={2} />
        </Card>
      </Col>
    </Row>
  );
};
