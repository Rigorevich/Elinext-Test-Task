import { useState } from "react";

import type { TMode } from "./types";
import { Controls, Display, Grid } from "./components";
import { useGrid } from "./hooks";

export const App = (): JSX.Element => {
  const { grid, handleBlockedClick, handlePointsClick, handleClearClick } =
    useGrid();
  const [mode, setMode] = useState<TMode>();

  const handleClear = (): void => {
    handleClearClick();
    setMode(undefined);
  };

  return (
    <>
      <Controls mode={mode} setMode={setMode} handleClearClick={handleClear} />
      <Display />
      <Grid
        mode={mode}
        grid={grid}
        handleBlockedClick={handleBlockedClick}
        handlePointsClick={handlePointsClick}
      />
    </>
  );
};
