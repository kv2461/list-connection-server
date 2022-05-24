import { FETCH_ALL,CREATE,UPDATE } from '../reducers/posts';

import * as api from '../api';

export const GetPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts();

        dispatch(FETCH_ALL(data));
    } catch (error) {
        console.log(error)
    }
}

export const CreatePost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post);

        dispatch(CREATE(data));
    } catch(error) {
        console.log(error);
    }
}

export const UpdatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id,post);
        
        dispatch(UPDATE(data));
    } catch (error) {
        console.log(error);
    }
}