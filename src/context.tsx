import React, { FC, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { contextToken, contextTokenConfirmed } from "./contexts";
import { LS_TOKEN_KEY } from "./settings/constants";

export const Context: FC = (props) => {
  const tokeConfirmed = useState(false);
  const token = useState(localStorage.getItem(LS_TOKEN_KEY) ?? "");

  return (
    <BrowserRouter>
      <contextTokenConfirmed.Provider value={tokeConfirmed}>
        <contextToken.Provider value={token}>
          {props.children}
        </contextToken.Provider>
      </contextTokenConfirmed.Provider>
    </BrowserRouter>
  );
};
