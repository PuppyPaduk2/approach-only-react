import { useToken } from "@src/contexts";
import { firstRoutePath } from "@src/routes";
import { routePaths } from "@src/settings/route-paths";
import React, { FC } from "react";
import { Redirect } from "react-router-dom";

export const PageRoot: FC = () => {
  const [token] = useToken();
  const to = token ? firstRoutePath : routePaths.auth;
  return <Redirect to={to} />;
};
