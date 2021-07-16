import { PageAuth } from "@src/pages/auth";
import { PageDashboard } from "@src/pages/dashboard";
import { PageError404 } from "@src/pages/error-404";
import { PageRoot } from "@src/pages/root";
import { ComponentNull, uuid } from "@src/utils";
import { RouteProps as ReactRouteProps } from "react-router-dom";
import { paths } from "./paths";
import { ComponentType } from "react";
import { GuardToken, GuardTokenRevert } from "@src/guards/token";

export interface RouteProps extends ReactRouteProps {
  key: string;
  component: ComponentType<any>;
  wrapper?: ComponentType<any>;
}

const createRoute = (props: Partial<RouteProps>) => ({
  key: uuid(),
  component: ComponentNull,
  ...props,
});

export const routes: RouteProps[] = [
  createRoute({
    path: paths.dashboard(),
    component: PageDashboard,
    wrapper: GuardToken,
  }),
  createRoute({
    path: paths.auth(),
    component: PageAuth,
    wrapper: GuardTokenRevert,
  }),
  createRoute({
    path: paths.error404(),
    component: PageError404,
  }),
  createRoute({
    path: paths.root(),
    component: PageRoot,
  }),
];

export const firstRoutePath = routes[0].path instanceof Array
  ? routes[0].path[0]
  : routes[0].path ?? paths.error404();
