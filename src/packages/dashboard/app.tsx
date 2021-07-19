import { sleep } from "@src/libs/utils/native";
import { Importer } from "@src/libs/utils/react";
import { ImportDefaultType } from "@src/libs/utils/types";
import { routePaths } from "@src/settings/route-paths";
import { CenterSpin } from "@src/libs/ui-kit";
import React, { FC } from "react";
import { Link } from "react-router-dom";

const importAuthHooks = () => import("@src/packages/auth/hooks").then(sleep());

const App: FC = () => {
  return <Importer
    import={importAuthHooks}
    component={DashboardInner}
    fallback={<CenterSpin size="large" />}
  />;
};

const DashboardInner: React.FC<{
  result: ImportDefaultType<typeof importAuthHooks>;
}> = ({ result }) => {
  result.useGuardToken();

  return (
    <>
      dashboard
      <Link to={routePaths.roles}>To Roles</Link>
      <Link to={routePaths.auth}>To Auth</Link>
    </>
  );
};

export default App;
