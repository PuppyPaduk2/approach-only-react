import { Spin } from "antd";
import styled from "styled-components";
import { PageHeader as AntPageHeader } from "antd";

export const CenterSpin = styled(Spin)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PageHeader = styled(AntPageHeader)`
  padding-right: 0;
  padding-left: 0;
`;
