import { createSlice } from "@reduxjs/toolkit"

interface WordState {}

const initialState: WordState = {}

const wordSlice = createSlice({
    initialState: initialState,
    name: "word",
    reducers: {},
})

export const wordActions = wordSlice.actions
export default wordSlice.reducer
