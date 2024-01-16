import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
// Reducers
import listSlice from "../features/slices/listSlice";
import userSlice from "../features/slices/userSlice";
// Api
import { shopApi } from "../features/api/getshopdata";
const persistConfig = {
  key: "root",
  storage,
};

const persistedLists = persistReducer(persistConfig, listSlice);
const persistedUsers = persistReducer(persistConfig, userSlice);

const store = configureStore({
  reducer: {
    lists: persistedLists,
    users: persistedUsers,
    [shopApi.reducerPath]: shopApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
        ],
      },
    }).concat(shopApi.middleware),
});

// Create the persistor
const persistor = persistStore(store);

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { store, persistor };
