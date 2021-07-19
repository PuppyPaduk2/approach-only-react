import { State } from "@src/libs/utils";
import { LS_TOKEN_KEY } from "@src/settings/constants";
import { createContext, useCallback, useContext } from "react";

export const contextTokenConfirmed = createContext<State<boolean>>([false, () => {}]);
export const useTokenConfirmed = () => useContext(contextTokenConfirmed);

export const contextToken = createContext<State<string>>(["", () => {}]);
export const useToken = () => useContext(contextToken);
export const useSetToken = () => {
  const [, setToken] = useToken();
  return useCallback((token: string) => {
    if (token) {
      localStorage.setItem(LS_TOKEN_KEY, token);
    } else {
      localStorage.removeItem(LS_TOKEN_KEY);
    }
    setToken(token);
  }, [setToken]);
};
