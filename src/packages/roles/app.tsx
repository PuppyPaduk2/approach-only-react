import { sleep } from "@src/libs/utils/native";
import { Importer } from "@src/libs/utils/react";
import { ImportDefaultType } from "@src/libs/utils/types";
import { routePaths } from "@src/settings/route-paths";
import { CenterSpin } from "@src/libs/ui-kit";
import { Button } from "antd";
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
  const tokenState = result.useToken();
  const [, setToken] = tokenState;

  result.useGuardToken({ tokenState });

  return (
    <>
      <Link to={routePaths.auth}>To Auth</Link>
      <Button onClick={() => setToken("")}>Sign out</Button>
    </>
  );
};

export default App;
