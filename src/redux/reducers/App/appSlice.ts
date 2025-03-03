import { Lang } from "@/core/const/lang"
import { Mode } from "@/core/const/mode"
import { createSlice } from "@reduxjs/toolkit"

interface AppState {
    isLoading: boolean
    mode: Mode
    language: Lang
}

const initialState: AppState = {
    isLoading: false,
    mode: Mode.dark,
    language: Lang.en,
}

const appSlice = createSlice({
    initialState: initialState,
    name: "app",
    reducers: {
        updateState: (state, action) => {
            return { ...state, ...action.payload }
        },
    },
})

export const appActions = appSlice.actions
export default appSlice.reducer
