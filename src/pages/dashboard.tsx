import { api } from "@src/api";
import { useSetToken } from "@src/contexts";
import { Button } from "antd";
import React, { FC, useCallback } from "react";

export const PageDashboard: FC = () => {
  const setToken = useSetToken();

  const signOut = useCallback(() => {
    api.signOut().then(() => setToken(""));
  }, []);

  return (
    <Button onClick={signOut}>Sign out</Button>
  );
}
