import React from "react";
import { Route } from "react-router-dom";
import { RouteProps } from ".";

export const mapRoutePropsList = (list: RouteProps[]) => list.map(({ key, component: Component, wrapper: Wrapper, ...props }) => (
  <Route key={key} {...props}>
    {Wrapper ? (
      <Wrapper>
        <Component />
      </Wrapper>
    ): (
      <Component />
    )}
  </Route>
));
