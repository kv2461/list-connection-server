import { createSlice } from '@reduxjs/toolkit';


export const postsSlice = createSlice({
    name:'posts',
    initialState:{posts:[], isLoading:true},
    reducers: {
        START_LOADING: (state,action) => {
            return {...state, isLoading:true}
        },
        END_LOADING: (state,action) => {
            return {...state, isLoading:false}
        },
        FETCH_ALL: (state,action) => {
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            }
        },
        FETCH_BY_SEARCH:(state,action)=>{
            return {...state, posts:action.payload}
        },
        CREATE: (state,action) => {
            return {...state, posts:[...state.posts, action.payload]};
        },
        UPDATE: (state,action)=> {
            return {...state, posts:state.posts.map((post)=> post._id === action.payload._id ? action.payload : post)};
        },
        DELETE:(state,action)=> {
            return {...state, posts: state.posts.filter((post)=> post._id !== action.payload)};
        },
        LIKE:(state,action)=> {
            return {...state, posts:state.posts.map((post)=> post._id === action.payload._id ? action.payload : post)};
        },
    }
})


export const {FETCH_ALL, CREATE, UPDATE, DELETE,LIKE,FETCH_BY_SEARCH,START_LOADING,END_LOADING} = postsSlice.actions;

export default postsSlice.reducer;