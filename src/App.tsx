import { useState } from "react";

import { Controls, Grid } from "./components";

export type TMode = "start" | "end" | "blocked";

export const App = (): JSX.Element => {
  const [mode, setMode] = useState<TMode>();

  return (
    <>
      <Controls mode={mode} />
      <Grid />
    </>
  );
};
