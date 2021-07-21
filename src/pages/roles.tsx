import { routePaths } from "@src/settings/route-paths";
import React, { FC } from "react";
import { Link } from "react-router-dom";

export const PageRoles: FC = () => {
  return (
    <>
      Roles

      <Link to={routePaths.dashboard}>To Dashboard</Link>
    </>
  );
};
