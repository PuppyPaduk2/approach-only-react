import * as React from "react";
import * as ReactDOM from "react-dom";
import 'antd/dist/antd.css';

import "./styles.css";
import "./setup";
import "./mock";
import { Context } from "./context";
import { Setup } from "./setup";
import { App } from "./app";

ReactDOM.render(
  <Context>
    <Setup>
      <App />
    </Setup>
  </Context>,
  document.getElementById("root")
);
