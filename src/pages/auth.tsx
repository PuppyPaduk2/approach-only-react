import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useApi } from "@src/hooks/api";
import { useToken } from "@src/hooks/token";
import { apiPaths } from "@src/settings/api-paths";
import { Button, Form, Input } from "antd";
import React, { FC, useCallback, useState } from "react";
import styled from "styled-components";

export const PageAuth: FC = () => {
  const api = useApi();
  const [, setToken] = useToken();

  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [loginError, setLoginError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const [pending, setPending] = useState<boolean>(false);

  const send = useCallback(() => {
    if (login && password) {
      setPending(true);
      api.post<string>(apiPaths.tokens, { login, password })
        .then(({ data }) => {
          setToken(data);
          setPending(false);
        })
        .catch(() => {
          setPending(false);
        });
    } else {
      if (!login) {
        setLoginError("Enter login");
      }
      if (!password) {
        setPasswordError("Enter password");
      }
    }
  }, [api, login, password]);

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
          <Button type="primary" block loading={pending} onClick={send}>
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
