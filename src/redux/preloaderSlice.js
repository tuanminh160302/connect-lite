import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    show: false
}

export const preloaderSlice = createSlice({
    name: 'preloader',
    initialState,
    reducers: {
        togglePreloader: (state, action) => {
            state.show = action.payload
        }
    }
})

export const {togglePreloader} = preloaderSlice.actions

export default preloaderSlice.reducer