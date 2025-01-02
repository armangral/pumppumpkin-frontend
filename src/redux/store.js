// src/redux/store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import walletReducer from "src/features/wallet/walletSlice";

// Create root reducer
const rootReducer = combineReducers({
  wallet: walletReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["wallet"],
};

// Create persisted reducer from root reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
