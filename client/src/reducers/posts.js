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
        },
        UPDATE: (posts,action)=> {
            return posts.map((post)=>post._id===action.payload._id ? action.payload : post)
        }
    }
})


export const {FETCH_ALL, CREATE, UPDATE} = postsSlice.actions;

export default postsSlice.reducer;