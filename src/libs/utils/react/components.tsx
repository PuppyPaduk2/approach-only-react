import React, { ComponentType, FC, ReactNode } from "react";
import { useImport } from "./hooks";
import { Import } from "./types";

export const ComponentNull: FC = () => null;

export function Importer<Result>(props: {
  import: Import<Result>;
  component: ComponentType<{ result: Result }>;
  fallback: ReactNode;
}) {
  const Component = props.component;
  const result = useImport(props.import);

  if (result) {
    return <Component result={result} />;
  } else {
    return <>{props.fallback}</>;
  }
}
