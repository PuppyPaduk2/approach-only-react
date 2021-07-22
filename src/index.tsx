import React, { memo, useMemo, useState } from "react";
import { render } from "react-dom";
import { BrowserRouter, Link, matchPath, Redirect, Route, Switch, useLocation } from "react-router-dom";
import { Menu } from "antd";
import 'antd/dist/antd.css';

import "./mock";
import "./styles.css";
import { useNonce, useSetupNonce } from "./hooks/token";
import { routePaths } from "./settings/route-paths";
import { readToken } from "./utils/token";
import { createApi } from "./utils/api";
import { useSetupApi } from "./hooks/api";
import { CenterSpin, Layout } from "./libs/ui-kit";

import { nonceContext, tokenContext } from "./contexts/token";
import { apiContext } from "./contexts/api";
import { Role, roleListContext } from "./contexts/roles";

import { PageAuth } from "./pages/auth";
import { PageRoles } from "./pages/roles";
import { PageDashboard } from "./pages/dashboard";
import { useSetupUserSettings } from "./hooks/user-settings";
import { initialUserSettings, UserSettings, userSettingsContext } from "./contexts/user-settings";

const Context = memo((props) => {
  const tokenState = useState(readToken());
  const nonceState = useState<string>("");
  const api = useMemo(createApi, []);
  const roleListState = useState<Role[]>([]);
  const userSettingsState = useState<UserSettings>(initialUserSettings);

  return (
    <BrowserRouter>
      <tokenContext.Provider value={tokenState}>
        <nonceContext.Provider value={nonceState}>
          <apiContext.Provider value={api}>
            <userSettingsContext.Provider value={userSettingsState}>
              <roleListContext.Provider value={roleListState}>
                {props.children}
              </roleListContext.Provider>
            </userSettingsContext.Provider>
          </apiContext.Provider>
        </nonceContext.Provider>
      </tokenContext.Provider>
    </BrowserRouter>
  );
});

const LayoutMenu = memo(() => {
  const { pathname } = useLocation();
  const selectedKeys = useMemo(() => {
    const isDashboard = matchPath(pathname, routePaths.dashboard);
    const isRoles = matchPath(pathname, routePaths.roles);
    return [
      isDashboard ? "dashboard" : "",
      isRoles ? "roles" : "",
    ].filter(Boolean);
  }, [pathname]);

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
});

const Setup = memo(() => {
  const [nonce] = useNonce();

  const pendingSetupApi = useSetupApi();
  const pendingSetupNonce = useSetupNonce();
  const pendingSetupUserSettings = useSetupUserSettings();
  const pendingSetup = pendingSetupApi
    || pendingSetupNonce
    || pendingSetupUserSettings;

  if (pendingSetup) {
    return <CenterSpin size="large" />;
  }

  return nonce ? <AuthSpace /> : <NonAuthSpace />;
});

const AuthSpace = memo(() => {
  const location = useLocation();
  return (
    <Layout headerMenu={<LayoutMenu />} >
      <Switch location={location}>
        <Route path={routePaths.roles} component={PageRoles} />
        <Route path={routePaths.dashboard} component={PageDashboard} />
        <Route path={routePaths.error404} />
        <Route path="*">
          <Redirect to={routePaths.dashboard} />
        </Route>
      </Switch>
    </Layout>
  )
});

const NonAuthSpace = memo(() => {
  return (
    <Switch>
      <Route path={routePaths.auth} component={PageAuth} />
      <Route path={routePaths.error404} />
      <Route path="*">
        <Redirect to={routePaths.auth} />
      </Route>
    </Switch>
  );
});

render(
  <Context>
    <Setup />
  </Context>,
  document.getElementById("root")
);
