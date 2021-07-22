import { useMemo, useState } from "react";
import { Import } from "./types";

export const useImport = <Result>(importer: Import<Result>) => {
  const [result, setResult] = useState<Result>();
  useMemo(
    () => importer().then((response) => setResult(response.default)),
    []
  );
  return result;
};
