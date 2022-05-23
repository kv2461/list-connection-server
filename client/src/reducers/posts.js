import { createSlice } from '@reduxjs/toolkit';
// import { FETCH_ALL, CREATE } from '../constants/actionTypes';


export const postsSlice = createSlice({
    name:'posts',
    initialState:{value:[]},
    reducers: {
        FETCH_ALL: (state, action) => {
            state.value = action.payload;
        },
    }
})
// export default(posts=[],action) => {
//     switch(action.type) {
//         case FETCH_ALL:
//             return action.payload;
//         case CREATE:
//             return[...posts,action.payload];
//     }
// }

export const { FETCH_ALL } = postsSlice.actions;

export default postsSlice.reducer;