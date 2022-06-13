import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    show: false
}

export const popUpSlice = createSlice({
    name: 'popup',
    initialState,
    reducers: {
        togglePopUp: (state, action) => {
            state.show = action.payload
        }
    }
})

export const {togglePopUp} = popUpSlice.actions
export default popUpSlice.reducer