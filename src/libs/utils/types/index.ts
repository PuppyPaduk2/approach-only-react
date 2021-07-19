export type PromiseType<T> = T extends Promise<infer U> ? U : T;

export type ImportType<T extends (...args: any) => any> = PromiseType<ReturnType<T>>;

export type ImportDefaultType<T extends (...args: any) => any> = ImportType<T>["default"];
