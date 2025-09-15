import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import BookReducer from "./features/books/bookSlice";
import navReducer from "./features/navbar/navbarSlice";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    book: BookReducer,
    nav: navReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
