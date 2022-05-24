import { createSlice } from '@reduxjs/toolkit';


export const postsSlice = createSlice({
    name:'posts',
    initialState:[],
    reducers: {
        FETCH_ALL: (posts,action) => {
            return posts = action.payload;
        },
        CREATE: (posts,action) => {
            return [...posts, action.payload];
        }
    }
})


export const {FETCH_ALL, CREATE} = postsSlice.actions;

export default postsSlice.reducer;