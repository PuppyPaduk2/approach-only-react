import * as React from "react";
import * as ReactDOM from "react-dom";
import 'antd/dist/antd.css';
import { BrowserRouter } from "react-router-dom";

import "./styles.css";
import { App } from "./app";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
