import { Dispatch, SetStateAction } from "react";

export type Dispatcher<Value = any> = Dispatch<SetStateAction<Value>>;

export type State<Value = any> = [Value, Dispatcher<Value>];
