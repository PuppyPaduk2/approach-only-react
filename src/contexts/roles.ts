import { State } from "@src/libs/utils";
import { createContext } from "react";

export type Role = {
  id?: string;
  cid: string;
  name: string;
};

export const roleListContext = createContext<State<Role[]>>([[], () => {}]);
