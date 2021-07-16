import { contextToken } from "@src/contexts";
import { paths } from "@src/routes/paths";
import React, { FC, useContext } from "react";
import { Redirect } from "react-router-dom";

export const GuardToken: FC = ({ children }) => {
  const [token] = useContext(contextToken);
  return token ? <>{children}</> : <Redirect to={paths.root()} />;
};

export const GuardTokenRevert: FC = ({ children }) => {
  const [token] = useContext(contextToken);
  return token ? <Redirect to={paths.root()} /> : <>{children}</>;
};
