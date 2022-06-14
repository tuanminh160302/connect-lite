import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showAddSkill: false,
    showEditSkill: false,
    skillToEdit: null,
    showAdmin: false
}

export const popUpSlice = createSlice({
    name: 'popup',
    initialState,
    reducers: {
        toggleFalse: (state) => {
            state.showAddSkill = false
            state.showEditSkill = false
            state.skillToEdit = null
            state.showAdmin = false
        },
        toggleAddSkill: (state, action) => {
            state.showAddSkill = action.payload
            state.showEditSkill = false
            state.skillToEdit = null
            state.showAdmin = false
        },
        toggleEditSkill: (state, action) => {
            state.showEditSkill = action.payload[0]
            state.showAddSkill = false
            state.skillToEdit = action.payload[1]
            state.showAdmin = false
        },
        toggleAdmin: (state, action) => {
            state.showAdmin = action.payload
            state.showAddSkill = false
            state.showEditSkill = false
            state.skillToEdit = null
        }
    }
})

export const {toggleFalse, toggleAddSkill, toggleEditSkill,toggleAdmin} = popUpSlice.actions
export default popUpSlice.reducer