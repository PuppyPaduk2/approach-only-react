import { useToken } from "@src/contexts";
import { paths } from "@src/routes/paths";
import { firstRoutePath } from "@src/routes";
import React, { FC } from "react";
import { Redirect } from "react-router-dom";

export const PageRoot: FC = () => {
  const [token] = useToken();
  const to = token ? firstRoutePath : paths.auth();
  return <Redirect to={to} />;
};
