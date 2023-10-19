import { useEffect, useState } from "react";

import { TMode, EMode } from "./types";
import { Controls, Display, Grid } from "./components";
import { useGrid } from "./hooks";

export const App = (): JSX.Element => {
  const {
    grid,
    handleBlockedClick,
    handlePointsClick,
    // handleClearClick,
    // handleRouteClick,
  } = useGrid();
  const [mode, setMode] = useState<TMode>(EMode.Blocked);

  // const handleClear = (): void => {
  //   handleClearClick();
  //   setMode(undefined);
  // };

  // const handleRoute = (): void => {
  //   handleRouteClick();
  //   setMode(undefined);
  // };

  return (
    <>
      {/* <Controls
        mode={mode}
        setMode={setMode}
        handleClearClick={handleClear}
        handleRouteClick={handleRoute}
      /> */}
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
