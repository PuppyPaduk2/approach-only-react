import { SpinSize } from "antd/lib/spin";
import React, { FC, lazy, Suspense as ReactSuspense } from "react";
import { CenterSpin } from ".";
import { Import } from "../utils/react";

export const Suspense: FC<{
  spinSize?: SpinSize;
}> = (props) => {
  return (
    <ReactSuspense fallback={<CenterSpin size={props.spinSize ?? "large"} />}>
      {props.children}
    </ReactSuspense>
  );
};

export const ImportSuspense: FC<{
  import: Import<any>;
  spinSize?: SpinSize;
}> = (props) => {
  const Component = lazy(props.import);
  return (
    <Suspense spinSize={props.spinSize}>
      <Component />
    </Suspense>
  );
};
