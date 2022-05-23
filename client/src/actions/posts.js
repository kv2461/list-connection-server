import { getPosts } from '../reducers/posts';

import * as api from '../api';

export const GetPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts();

        dispatch(getPosts(data));
    } catch (error) {
        console.log(error)
    }
}

// export const createPost = (post) = async (dispatch) => {
//     try {
//         const { data } = await api.createPost(post);

//         dispatch({ type:CREATE, payload:data});
//     } catch(error) {
//         console.log(error);
//     }
// }