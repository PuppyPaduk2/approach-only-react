import { createContext } from "react";
import { createApi } from "@src/utils/api";

export const apiContext = createContext(createApi());
