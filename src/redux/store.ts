import AsyncStorage from "@react-native-async-storage/async-storage"
import { configureStore } from "@reduxjs/toolkit"
import { persistReducer, persistStore } from "redux-persist"
import { rootReducer } from "./rootReducers"
const persistConfig = {
    key: "root",
    storage: AsyncStorage,
    blacklist: [],
    whitelist: ["app", "chat", "auth"],
    timeout: 10000,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: {
        root: persistedReducer,
    },
    middleware(getDefaultMiddleware) {
        return getDefaultMiddleware({
            serializableCheck: false,
        })
    },
})
export const persistor = persistStore(store)
