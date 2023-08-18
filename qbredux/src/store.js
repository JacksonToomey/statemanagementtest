import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "./qbslice";

export const store = configureStore({
  reducer: {
    qb: reducer,
  },
});
