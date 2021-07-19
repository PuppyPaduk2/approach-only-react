import { useToken } from "@src/contexts";
import { routePaths } from "@src/settings/route-paths";
import React, { FC } from "react";
import { Redirect } from "react-router-dom";

export const GuardToken: FC = ({ children }) => {
  const [token] = useToken();
  return token ? <>{children}</> : <Redirect to={routePaths.root} />;
};

export const GuardTokenRevert: FC = ({ children }) => {
  const [token] = useToken();
  return token ? <Redirect to={routePaths.root} /> : <>{children}</>;
};
