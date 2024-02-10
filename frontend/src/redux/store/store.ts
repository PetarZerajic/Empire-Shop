import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../slices/apiSlice";
import cartSliceReducer from "../slices/cartSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "products",
  storage,
};

const persistedReducer = persistReducer(persistConfig, cartSliceReducer);

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      apiSlice.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;

export const persistor = persistStore(store);
