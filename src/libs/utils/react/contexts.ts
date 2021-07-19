import { createContext } from 'react';

import { State } from "./types";

export const InitialContextDispatcher = () => {};

export const createContextState = <Value>(initialValue: Value) =>
  createContext<State<Value>>([initialValue, InitialContextDispatcher]);
