import { FETCH_BY_SEARCH,FETCH_ALL,CREATE,UPDATE,DELETE,LIKE, START_LOADING, END_LOADING } from '../reducers/posts';

import * as api from '../api';

export const GetPosts = (page) => async (dispatch) => {
    try {
        dispatch(START_LOADING());
        const { data } = await api.fetchPosts(page);

        dispatch(FETCH_ALL(data));
        dispatch(END_LOADING());
    } catch (error) {
        console.log(error)
    }
}

export const GetPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch(START_LOADING())
        const { data: {data} } = await api.fetchPostsBySearch(searchQuery); 
        //destructuring required twice due to axios request AND postsearch assigning it to a new object called data
        
        dispatch(FETCH_BY_SEARCH(data));
        dispatch(END_LOADING());
    } catch (error) {
        console.log(error);
    }
}

export const CreatePost = (post) => async (dispatch) => {
    try {
        dispatch(START_LOADING())
        const { data } = await api.createPost(post);

        dispatch(CREATE(data));
        dispatch(END_LOADING());
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

export const DeletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);

        dispatch(DELETE(id))
    } catch (error) {
        console.log(error);
    }
}

export const LikePost = (id) => async (dispatch) => {
    try {
        const {data} = await api.likePost(id);

        dispatch(LIKE(data));
    } catch (error) {
        console.log(error)
    }
}