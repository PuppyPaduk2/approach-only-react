import { ComponentType } from "react";
import { RouteProps as ReactRouteProps } from "react-router-dom";
import { ComponentNull, uuid } from "../utils";

export interface RouteProps extends ReactRouteProps {
  key: string;
  component: ComponentType<any>;
  wrapper?: ComponentType<any>;
}

export const createRoute = (props: Partial<RouteProps>) => ({
  key: uuid(),
  component: ComponentNull,
  ...props,
});
