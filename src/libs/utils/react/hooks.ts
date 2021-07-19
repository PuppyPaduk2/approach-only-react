import { useMemo, useState } from "react";
import { Import } from "./types";

export const load = <Result>(imp: Import<Result>) => {
  const [result, setResult] = useState<Result>();
  useMemo(
    () => imp().then((response) => setResult(response.default)),
    []
  );
  return result;
};
