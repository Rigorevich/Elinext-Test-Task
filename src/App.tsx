import { Controls, Display, Grid } from "./components";
import { GridProvider } from "./context/GridContext";

export const App = (): JSX.Element => {
  return (
    <GridProvider>
      <Controls />
      <Display />
      <Grid />
    </GridProvider>
  );
};
