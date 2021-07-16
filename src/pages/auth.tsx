import { Button, Form, Input } from "antd";
import React, { FC, useState } from "react";
import styled from "styled-components";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useSetToken } from "@src/contexts";

export const PageAuth: FC = () => {
  const setToken = useSetToken();

  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [loginError, setLoginError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  return (
    <Container>
      <Form>
        <Form.Item
          validateStatus={loginError ? "error" : undefined}
          help={loginError ? loginError : undefined}
        >
          <Input
            type="text"
            placeholder="login"
            prefix={<UserOutlined className="site-form-item-icon" />}
            value={login}
            onChange={(event) => setLogin(event.target.value)}
          />
        </Form.Item>
        <Form.Item
          validateStatus={passwordError ? "error" : undefined}
          help={passwordError ? passwordError : undefined}
        >
          <Input
            type="password"
            placeholder="password"
            prefix={<LockOutlined className="site-form-item-icon" />}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" block onClick={() => {
            if (login && password) {
              setToken("token-asd-123");
            } else {
              if (!login) {
                setLoginError("Enter login");
              }
              if (!password) {
                setPasswordError("Enter password");
              }
            }
          }}>
            sign in
          </Button>
        </Form.Item>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
