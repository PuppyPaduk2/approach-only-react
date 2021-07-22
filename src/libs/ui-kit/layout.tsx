import React, { memo, PropsWithChildren, ReactNode } from "react";
import { Layout as AntLayout, Space } from "antd";
import styled from "styled-components";

const { Header: AntHeader, Content: AntContent } = AntLayout;

export const Layout = memo<PropsWithChildren<{
  headerMenu?: ReactNode;
  headerExtra?: ReactNode;
}>>((props) => {
  return (
    <Container>
      <AntLayout data-id="layout">
        <AntHeader data-id="header" style={{ position: "sticky", top: 0, zIndex: 1000 }}>
          <Space size="middle">
            {props.headerMenu}
          </Space>
          <Space size="middle">
            {props.headerExtra}
          </Space>
        </AntHeader>
        <ContentContainer>
          {props.children}
        </ContentContainer>
        <ToolsContainer />
      </AntLayout>
    </Container>
  );
});

const Container = styled.div`
  height: 100%;

  [data-id="layout"] {
    min-height: 100%;
  }

  [data-id="header"] {
    display: flex;
    flex: none;
    align-items: center;
    justify-content: space-between;
  }
`;

const ContentContainer = styled(AntContent)`
  margin: 32px 48px 32px 48px;
`;

const ToolsContainer = styled.div`
  position: fixed;
  right: 64px;
  bottom: 48px;
  z-index: 10000;

  display: flex;
`;
