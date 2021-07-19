import { State } from "@src/libs/utils";
import { routePaths } from "@src/settings/route-paths";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { LS_TOKEN_KEY } from "./settings";

const readToken = () => localStorage.getItem(LS_TOKEN_KEY) ?? "";

const writeToken = (token: string) => {
  if (token) {
    localStorage.setItem(LS_TOKEN_KEY, token);
  } else {
    localStorage.removeItem(LS_TOKEN_KEY);
  }
}

const useToken = (): State<string> => {
  const [token, setToken] = useState<string>(readToken());

  useEffect(() => {
    writeToken(token);
  }, [token]);

  return [token, setToken];
};

const useGuardToken = (params?: {
  path?: string;
  tokenState?: State<string>;
}) => {
  const history = useHistory();
  const [token] = params?.tokenState ?? useToken();

  useEffect(() => {
    if (token) {
      if (params?.path) {
        history.push(params.path);
      }
    } else {
      history.push(routePaths.auth);
    }
  }, [params?.path, history, token]);
};

const useGuardTokenRevert = (params?: {
  path?: string;
  tokenState?: State<string>;
}) => {
  const history = useHistory();
  const [token] = params?.tokenState ?? useToken();

  useEffect(() => {
    if (token) {
      if (params?.path) {
        history.push(params.path);
      }
    } else {
      history.push(routePaths.auth);
    }
  }, [params?.path, history, token]);
};

export default {
  useToken,
  useGuardToken,
  useGuardTokenRevert,
};
