import { useContext } from "react";

import { GridContext, TGridContext } from "../context/GridContext";

export const useParams = (): TGridContext => {
  return useContext(GridContext) as TGridContext;
};
