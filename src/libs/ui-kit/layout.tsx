import React, { FC, ReactNode } from "react";
import { Layout as AntLayout, Space } from "antd";
import styled from "styled-components";

const { Header: AntHeader, Content: AntContent } = AntLayout;

export const Layout: FC<{
  headerMenu?: ReactNode;
  headerExtra?: ReactNode;
}> = (props) => {
  console.log("@@@Layout render");

  return (
    <Container>
      <AntLayout data-id="layout">
        <AntHeader data-id="header" style={{ position: "sticky", top: 0, zIndex: 1000 }}>
          <Space size="middle">
            {props.headerMenu}
          </Space>
          {/* <div>asdasdasd</div> */}
          {/* <Menu theme="dark" mode="horizontal">
            <Menu.Item key="test-1">
              <span>Test 1</span>
            </Menu.Item>
            <Menu.Item key="test-2">
              <span>Test 2</span>
            </Menu.Item>
          </Menu> */}
          <Space size="middle">
            {props.headerExtra}
            {/* <Button type="primary">Sign out</Button> */}
          </Space>
        </AntHeader>
        <ContentContainer>
          {props.children}
        </ContentContainer>
        <ToolsContainer />
      </AntLayout>
    </Container>
  );
};

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
