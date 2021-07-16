import { LS_TOKEN_KEY } from "@src/constants";
import { State } from "@src/utils/types";
import { createContext, useCallback, useContext } from "react";

export const contextToken = createContext<State<string>>(["", () => {}]);
export const useToken = () => useContext(contextToken);
export const useSetToken = () => {
  const [, setToken] = useToken();
  return useCallback((token: string) => {
    localStorage.setItem(LS_TOKEN_KEY, token);
    setToken(token);
  }, [setToken]);
};
