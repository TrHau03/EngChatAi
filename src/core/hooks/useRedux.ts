import { store } from "@/redux/store"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
