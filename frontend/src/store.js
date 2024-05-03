import { configureStore } from "@reduxjs/toolkit";
import cartSliceReducer from "./slices/cartSlice";

import { apiSlice } from "./slices/apislice";
const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
