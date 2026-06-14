import { createContext, useState } from "react";

export const WorkoutsContext = createContext();

export const WorkoutsContextProvider = ({ children }) => {
  const [workouts, setWorkouts] = useState([]);

  const clearWorkouts = () => {
    setWorkouts([]);
  };

  return (
    <WorkoutsContext.Provider
      value={{
        workouts,
        setWorkouts,
        clearWorkouts,
      }}
    >
      {children}
    </WorkoutsContext.Provider>
  );
};