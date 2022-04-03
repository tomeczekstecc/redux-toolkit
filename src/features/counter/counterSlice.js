import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    count: 0
};

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: state => {
            state.count++;
        },
        decrement: state => {
            state.count--;
        },
        reset: state => {
            state.count = 0;
        },
        incrementByAmount: (state, action) => {
            console.log(action.payload);
            state.count += action.payload;
        },

    }
});


export const {incrementByAmount, increment, decrement, reset} = counterSlice.actions;

export default counterSlice.reducer;
