import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import React, { FC, useCallback, useState } from "react";
import styled from "styled-components";

import hooks from "@src/packages/auth/hooks";
import { routePaths } from "@src/settings/route-paths";

const AuthForm: FC = () => {
  const tokenState = hooks.useToken();
  const [, setToken] = tokenState;

  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [loginError, setLoginError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const send = useCallback(() => {
    if (login && password) {
      setToken("token-asd-123");
      // api.signIn({ login, password }).then(setToken);
    } else {
      if (!login) {
        setLoginError("Enter login");
      }
      if (!password) {
        setPasswordError("Enter password");
      }
    }
  }, [login, password]);

  hooks.useGuardTokenRevert({ path: routePaths.dashboard, tokenState });

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
          <Button type="primary" block onClick={send}>
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

export default AuthForm;
