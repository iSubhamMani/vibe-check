import { configureStore } from "@reduxjs/toolkit";
import musicQueueSlice from "./slices/musicQueue";

export const makeStore = () => {
  return configureStore({
    reducer: {
      musicQueue: musicQueueSlice,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
