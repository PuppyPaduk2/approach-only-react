import React, { FC } from "react";
import { Button, Layout as AntLayout, Menu, Space } from "antd";
import styled from "styled-components";

const { Header: AntHeader, Content: AntContent } = AntLayout;

export const Layout: FC = (props) => {
  return (
    <Container>
      <AntLayout data-id="layout">
        <AntHeader data-id="header" style={{ position: "sticky", top: 0, zIndex: 1000 }}>
          <Menu theme="dark" mode="horizontal">
            <Menu.Item>
              <span>Test 1</span>
            </Menu.Item>
            <Menu.Item>
              <span>Test 2</span>
            </Menu.Item>
          </Menu>
          <Space size="middle">
            <Button type="primary">Sign out</Button>
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
