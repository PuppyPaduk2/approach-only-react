import { Context, Dispatch, SetStateAction } from 'react';

export type Dispatcher<Value> = Dispatch<SetStateAction<Value>>;

export type State<Value> = [Value, Dispatcher<Value>];

export type ContextState<Value> = Context<State<Value>>;

export type Import<Result> = () => Promise<{ default: Result }>;
