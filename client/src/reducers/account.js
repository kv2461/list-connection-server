import { createSlice } from '@reduxjs/toolkit';


export const accountSlice = createSlice({
    name:'posts',
    initialState:{data: {}, users:[], chat:{}},
    reducers: {
        ACCOUNT_INFO: (state,action) => {
            return {...state, data:action.payload}
        },
        USER_INFO: (state, action) => { //not being used 
            return {...state, }
        },
        CHAT_INFO: (state,action) => {
            return {...state, chat:action.payload}
        }
    }
})

export const {ACCOUNT_INFO, USER_INFO, CHAT_INFO} = accountSlice.actions;

export default accountSlice.reducer;
