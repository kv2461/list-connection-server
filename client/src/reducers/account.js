import { createSlice } from '@reduxjs/toolkit';


export const accountSlice = createSlice({
    name:'posts',
    initialState:{data: {}, users:[]},
    reducers: {
        ACCOUNT_INFO: (state,action) => {
            return {...state, data:action.payload}
        },
        USER_INFO: (state, action) => {
            return {...state, }
        }
    }
})

export const {ACCOUNT_INFO, USER_INFO} = accountSlice.actions;

export default accountSlice.reducer;
