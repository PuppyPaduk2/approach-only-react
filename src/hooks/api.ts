import { apiContext } from "@src/contexts/api";
import { useContext, useEffect, useState } from "react";
import { useNonce } from "./token";

export const useApi = () => useContext(apiContext);

export const useSetupApi = () => {
  const api = useApi();
  const [nonce, setNonce] = useNonce();
  const [pending, setPending] = useState<boolean>(true);

  useEffect(() => {
    setPending(true);

    const interceptorRequest = api.interceptors.request.use((config) => ({
      ...config,
      header: { "Authentication": nonce },
    }));
    const interceptorResponse = api.interceptors.response.use(
      (response) => response,
      (error) => {
        switch (error?.response?.status) {
          case 401:
            setNonce("");
            break;
        }
        throw error;
      },
    );
    setPending(false);
    return () => {
      api.interceptors.request.eject(interceptorRequest);
      api.interceptors.response.eject(interceptorResponse);
    };
  }, [nonce]);

  return pending;
};
