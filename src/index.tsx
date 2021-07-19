import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import 'antd/dist/antd.css';
import { CenterSpin, Layout } from "@src/libs/ui-kit";

import "./styles.css";
import { Import } from "./libs/utils/react";
import { sleep } from "./libs/utils/native";
import { SpinSize } from "antd/lib/spin";

const importAuthApp = () => import("@src/packages/auth/app").then(sleep());
const importDashboardApp = () => import("@src/packages/dashboard/app").then(sleep());
const importRolesApp = () => import("@src/packages/roles/app").then(sleep());

const CommonSuspense: React.FC<{
  import: Import<React.ComponentType<any>>;
  spinSize?: SpinSize;
}> = (props) => {
  const Component = React.lazy(props.import);
  return (
    <React.Suspense fallback={<CenterSpin size={props.spinSize ?? "large"} />}>
      <Component />
    </React.Suspense>
  );
};

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/roles">
        <Layout>
          <CommonSuspense import={importRolesApp} />
        </Layout>
      </Route>
      <Route path="/dashboard">
        <Layout>
          <CommonSuspense import={importDashboardApp} />
        </Layout>
      </Route>
      <Route path="/auth">
        <CommonSuspense import={importAuthApp} />
      </Route>
      <Route path="*">404</Route>
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
