import {createSlice} from "@reduxjs/toolkit";

const initialState = [
    {id: '0', name: "Dude Lebowski"},
    {id: '1', name: "Neil Armstrong"},
    {id: '2', name: "Dave Grayson"},
]


const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.push(action.payload)
        },
        removeUser: (state, action) => {
            state.splice(action.payload, 1)
        }
    }
})

export const getAllUsers = (state) => state.users

export const {addUser, removeUser} = usersSlice.actions

export default usersSlice.reducer
