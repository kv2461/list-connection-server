import { createSlice } from '@reduxjs/toolkit';


export const authSlice = createSlice({
    name:'auth',
    initialState:{authData:null},
    reducers: {
        AUTH: (state,action) => {
            localStorage.setItem('profile',JSON.stringify({...action?.payload?.data }));
            return {authData:action?.payload?.data};
        },
        LOGOUT: (state,action) => {
            localStorage.clear();

            return {authData:null};
        }
    }
})


export const {AUTH, LOGOUT} = authSlice.actions;

export default authSlice.reducer;