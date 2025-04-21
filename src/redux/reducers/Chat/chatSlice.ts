import { ChatType } from "@/screens/Chat/Chat"
import { createSlice } from "@reduxjs/toolkit"

interface ChatState {
    chat: ChatType[]
}

const initialState: ChatState = {
    chat: [],
}

const chatSlice = createSlice({
    initialState: initialState,
    name: "chat",
    reducers: {
        updateState: (state, action) => {
            return { ...state, ...action.payload }
        },
        updateChat: (state, action) => {
            return { ...state, chat: [...state.chat, action.payload] }
        },
        deleteChat: (state, action) => {
            return { ...state, chat: action.payload }
        },
    },
})

export const chatActions = chatSlice.actions
export default chatSlice.reducer
