import { createSlice } from '@reduxjs/toolkit';


export const accountSlice = createSlice({
    name:'posts',
    initialState:{data: {}, users:[], chat:{}, chatLoading:false},
    reducers: {
        ACCOUNT_INFO: (state,action) => {
            return {...state, data:action.payload}
        },
        USER_INFO: (state,action) => { //not being used 
            return {...state, }
        },
        CHAT_INFO: (state,action) => {
            return {...state, chat:action.payload, chat_id:action.payload._id, chat_participants:action.payload.participants, messages:action.payload.messages }
        },
        START_CHAT_LOADING: (state,action) => {
            return {...state, chatLoading:true}
        },
        END_CHAT_LOADING: (state,action) => {
            return {...state, chatLoading:false}
        },
        PREVIEW: (state, action) => {
            return {...state, preview:action.payload}
        },
        MESSAGE: (state,action) => {
            return {...state, messages: action.payload.messages, chat: action.payload}
        }
    }
})

export const {ACCOUNT_INFO, USER_INFO, CHAT_INFO, START_CHAT_LOADING, END_CHAT_LOADING, PREVIEW, MESSAGE} = accountSlice.actions;

export default accountSlice.reducer;
