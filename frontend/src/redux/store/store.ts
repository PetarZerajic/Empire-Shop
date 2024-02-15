import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../slices/apiSlice";
import cartSliceReducer from "../slices/cartSlice";
import authSliceReducer from "../slices/authSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const cartPersistConfig = {
  key: "cart",
  storage,
};

const authPersistConfig = {
  key: "auth",
  storage,
};

const rootReducer = combineReducers({
  cart: persistReducer(cartPersistConfig, cartSliceReducer),
  auth: persistReducer(authPersistConfig, authSliceReducer),
});

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    reducer: rootReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      apiSlice.middleware
    ),
});
export type RootState = ReturnType<typeof store.getState>;

export const persistor = persistStore(store);
