import { Spin } from "antd";
import axios from "axios";
import React from "react";
import { FC, useEffect } from "react";
import styled from "styled-components";
import { api } from "./api";
import { useSetToken, useToken, useTokenConfirmed } from "./contexts";
import { API_BASE_URL } from "./settings/constants";

axios.defaults.baseURL = API_BASE_URL;

export const Setup: FC = (props) => {
  const [tokenConfirmed, setTokenConfirmed] = useTokenConfirmed();
  const [token] = useToken();
  const setToken = useSetToken();

  useEffect(() => {
    const interceptorRequest = axios.interceptors.request.use((config) => ({
      ...config,
      headers: { "Token": token },
    }));
    const interceptorResponse = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        switch (error.response.status) {
          case 401:
            setTokenConfirmed(false);
            setToken("");
            break;
        }
      }
    );
    return () => {
      axios.interceptors.request.eject(interceptorRequest);
      axios.interceptors.response.eject(interceptorResponse);
    };
  }, [token]);

  useEffect(() => {
    api.checkToken().then(() => setTokenConfirmed(true));
  }, []);

  if (tokenConfirmed) {
    return <>{props.children}</>;
  } else {
    return <CenterSpin size="large" spinning />;
  }
};

const CenterSpin = styled(Spin)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
