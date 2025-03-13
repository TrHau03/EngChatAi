import { Message } from "@/core/entities/message"
import { createSlice } from "@reduxjs/toolkit"

interface ChatState {
    chat: {
        _id: string
        messages: Message[]
    }[]
}

const initialState: ChatState = {
    chat: [],
}

const chatSlice = createSlice({
    initialState: initialState,
    name: "chat",
    reducers: {
        updateChat: (state, action) => {
            return { ...state, chat: [...state.chat, action.payload] }
        },
    },
})

export const chatActions = chatSlice.actions
export default chatSlice.reducer
