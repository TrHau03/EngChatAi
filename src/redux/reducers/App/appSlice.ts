import { Lang } from "@/core/const/lang"
import { Mode } from "@/core/const/mode"
import { createSlice } from "@reduxjs/toolkit"

interface AppState {
    isLoading: boolean
    mode: Mode
    language: Lang
    speed: number
    tts: {
        id: string
        isSpeaking: boolean
    }
}

const initialState: AppState = {
    isLoading: false,
    mode: Mode.dark,
    language: Lang.vi,
    speed: 1,
    tts: {
        id: "",
        isSpeaking: false,
    },
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
