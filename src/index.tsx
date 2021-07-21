import React, { FC, useState } from "react";
import { render } from "react-dom";
import { BrowserRouter, Link, matchPath, Redirect, Route, Switch, useLocation } from "react-router-dom";
import { Menu } from "antd";
import 'antd/dist/antd.css';

import "./mock";
import "./styles.css";
import { nonceContext, tokenContext } from "./contexts/token";
import { useNonce, useSetupNonce } from "./hooks/token";
import { routePaths } from "./settings/route-paths";
import { readToken } from "./utils/token";
import { createApi } from "./utils/api";
import { apiContext } from "./contexts/api";
import { useSetupApi } from "./hooks/api";
import { CenterSpin, Layout } from "./libs/ui-kit";

import { PageAuth } from "./pages/auth";
import { PageRoles } from "./pages/roles";
import { PageDashboard } from "./pages/dashboard";

const Context: FC = (props) => {
  const tokenState = useState(readToken());
  const nonceState = useState<string>("");
  const api = createApi();

  return (
    <tokenContext.Provider value={tokenState}>
      <nonceContext.Provider value={nonceState}>
        <apiContext.Provider value={api}>
          {props.children}
        </apiContext.Provider>
      </nonceContext.Provider>
    </tokenContext.Provider>
  );
};

const LayoutMenu: FC = () => {
  const { pathname } = useLocation();
  const isDashboard = matchPath(pathname, routePaths.dashboard);
  const isRoles = matchPath(pathname, routePaths.roles);
  const selectedKeys = [
    isDashboard ? "dashboard" : "",
    isRoles ? "roles" : "",
  ].filter(Boolean);

  return (
    <Menu
      theme="dark"
      mode="horizontal"
      selectedKeys={selectedKeys}
    >
      <Menu.Item key="dashboard">
        <Link to={routePaths.dashboard}>Dashboard</Link>
      </Menu.Item>
      <Menu.Item key="roles">
        <Link to={routePaths.roles}>Roles</Link>
      </Menu.Item>
    </Menu>
  );
};

const Setup: FC = () => {
  const [nonce] = useNonce();

  const pendingSetupApi = useSetupApi();
  const pendingSetupNonce = useSetupNonce();
  const pendingSetup = pendingSetupApi || pendingSetupNonce;

  if (pendingSetup) {
    return <CenterSpin size="large" />;
  }

  return nonce ? (
    <Layout
      headerMenu={<LayoutMenu />}
    >
      <Switch>
        <Route path={routePaths.roles} component={PageRoles} />
        <Route path={routePaths.dashboard} component={PageDashboard} />
        <Route path={routePaths.error404} />
        <Route path="*">
          <Redirect to={routePaths.dashboard} />
        </Route>
      </Switch>
    </Layout>
  ) : (
    <Switch>
      <Route path={routePaths.auth} component={PageAuth} />
      <Route path={routePaths.error404} />
      <Route path="*">
        <Redirect to={routePaths.auth} />
      </Route>
    </Switch>
  );
};

render(
  <BrowserRouter>
    <Context>
      <Setup />
    </Context>
  </BrowserRouter>,
  document.getElementById("root")
);
