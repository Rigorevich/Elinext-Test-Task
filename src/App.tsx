import { useCallback, useState } from "react";

import { Controls, Display, Grid } from "./components";

export const App = (): JSX.Element => {
  return (
    <>
      {/* <Controls mode={mode} setMode={setMode} /> */}
      <Display />
      <Grid />
    </>
  );
};
