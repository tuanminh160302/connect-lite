import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showAddSkill: false,
    showEditSkill: false,
    skillToEdit: null
}

export const popUpSlice = createSlice({
    name: 'popup',
    initialState,
    reducers: {
        toggleFalse: (state) => {
            state.showAddSkill = false
            state.showEditSkill = false
            state.skillToEdit = null
        },
        toggleAddSkill: (state, action) => {
            state.showAddSkill = action.payload
            state.showEditSkill = false
            state.skillToEdit = null
        },
        toggleEditSkill: (state, action) => {
            state.showEditSkill = action.payload[0]
            state.showAddSkill = false
            state.skillToEdit = action.payload[1]
        }
    }
})

export const {toggleFalse, toggleAddSkill, toggleEditSkill} = popUpSlice.actions
export default popUpSlice.reducer