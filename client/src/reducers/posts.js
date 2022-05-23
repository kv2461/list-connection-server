import { createSlice } from '@reduxjs/toolkit';


export const postsSlice = createSlice({
    name:'posts',
    initialState:[],
    reducers: {
        getPosts: (state,action) => {
            return state = action.payload;
        }
    }
})


export const {getPosts} = postsSlice.actions;

export default postsSlice.reducer;