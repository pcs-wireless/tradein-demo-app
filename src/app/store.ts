import { connectRoutes } from "redux-first-router";
import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { createHashHistory } from "history";
import options from "../routings/options";
import routesMap from "../routings/routesMap";
import itemSlice from "../components/itemSlice";
import queryString from "query-string";

const { reducer, enhancer, middleware } = connectRoutes(routesMap, {
  ...options,
  querySerializer: queryString,
  createHistory: createHashHistory,
});

export const store = configureStore({
  reducer: {
    item: itemSlice,
    location: reducer,
  },
  enhancers: [enhancer],
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
