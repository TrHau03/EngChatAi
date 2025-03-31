import AsyncStorage from "@react-native-async-storage/async-storage"
import { configureStore, Middleware } from "@reduxjs/toolkit"
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from "redux-persist"
import { apiService } from "./apiService"
import { rootReducer } from "./rootReducers"
const persistConfig = {
    key: "root",
    storage: AsyncStorage,
    blacklist: ["chat"],
    whitelist: ["auth" , "app"],
    timeout: 10000,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: {
        root: persistedReducer,
        [apiService.reducerPath]: apiService.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(apiService.middleware as Middleware),
})
export const persistor = persistStore(store)
