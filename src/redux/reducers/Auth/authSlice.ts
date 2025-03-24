import { createSlice } from "@reduxjs/toolkit"

interface AuthState {
    access_token: string
    refresh_token: string
    user: any
    isLogin: boolean
}

const initialState: AuthState = {
    access_token: "",
    refresh_token: "",
    user: null,
    isLogin: false,
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        updateState: (state, action) => {
            return { ...state, ...action.payload }
        },
        login: (state, action) => {
            state.user = action.payload
        },
        logout: (state) => {
            state.user = null
        },
    },
})
export const authAction = authSlice.actions
export default authSlice.reducer
