import React, { FC, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { LS_TOKEN_KEY } from './constants';
import { contextToken } from './contexts';
import { routes } from './routes';

export const App: FC = () => {
  return (
    <contextToken.Provider
      value={useState(localStorage.getItem(LS_TOKEN_KEY) ?? "")}
    >
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
    </contextToken.Provider>
  );
};
