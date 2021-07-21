import { nonceContext, tokenContext } from "@src/contexts/token";
import { apiPaths } from "@src/settings/api-paths";
import { writeToken } from "@src/utils/token";
import { useContext, useEffect, useState } from "react";
import { useApi } from "./api";

export const useToken = () => {
  const tokenState = useContext(tokenContext);
  const [token] = tokenState;

  useEffect(() => {
    writeToken(token);
  }, [token]);

  return tokenState;
};

export const useNonce = () => {
  const nonceState = useContext(nonceContext);
  return nonceState;
};

export const useSetupNonce = () => {
  const api = useApi();
  const [token, setToken] = useToken();
  const [nonce, setNonce] = useNonce();
  const [pending, setPending] = useState<boolean>(true);

  useEffect(() => {
    if (token) {
      if (!nonce) {
        setPending(true);
        api.post<string>(apiPaths.nonces, { token })
          .then(({ data }) => {
            setNonce(data);
            setPending(false);
          })
          .catch(() => {
            setToken("");
            setPending(false);
          });
      }
    } else {
      setNonce("");
      setPending(false);
    }
  }, [token, nonce]);

  return pending;
};
