import { State } from "@src/libs/utils";
import { createContext } from "react";

export const tokenContext = createContext<State<string>>(["", () => {}]);

export const nonceContext = createContext<State<string>>(["", () => {}]);
