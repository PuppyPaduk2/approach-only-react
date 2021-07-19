import React, { FC } from 'react';
import { Route, Switch } from 'react-router-dom';
import { routes } from './routes';

export const App: FC = () => {
  return (
    <Switch>
      {routes.map(({ key, component: Component, wrapper: Wrapper, ...props }) => (
        <Route key={key} {...props}>
          {Wrapper ? (
            <Wrapper>
              <Component />
            </Wrapper>
          ): (
            <Component />
          )}
        </Route>
      ))}
    </Switch>
  );
};
