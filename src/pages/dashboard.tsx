import { routePaths } from "@src/settings/route-paths";
import React, { FC } from "react";
import { Link } from "react-router-dom";

export const PageDashboard: FC = () => {
  return (
    <>
      Dashboard

      <Link to={routePaths.roles}>To Roles</Link>
    </>
  );
};
