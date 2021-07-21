import { LS_TOKEN_KEY } from "@src/settings/constants";

export const readToken = () =>
  localStorage.getItem(LS_TOKEN_KEY) ?? "";

export const writeToken = (token: string) => {
  if (token) {
    localStorage.setItem(LS_TOKEN_KEY, token);
  } else {
    localStorage.removeItem(LS_TOKEN_KEY);
  }
};
