import { useContext } from "react";
import { WorkoutsContext } from "./WorkoutsContext";

export const useWorkoutsContext = () => {
  return useContext(WorkoutsContext);
};