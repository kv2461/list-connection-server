import { FETCH_BY_SEARCH, FETCH_POST, FETCH_ALL, CREATE, UPDATE, DELETE, LIKE, START_LOADING, END_LOADING, COMMENT } from '../reducers/posts';

import * as api from '../api';

export const GetPost = (id) => async (dispatch) => {
    try {
        dispatch(START_LOADING());
        
        const { data } = await api.fetchPost(id);

        dispatch(FETCH_POST(data));
        dispatch(END_LOADING());
    } catch (error) {
        console.log(error)
    }
}

export const GetPosts = (page, subgenrename, genrename) => async (dispatch) => {
    try {
        dispatch(START_LOADING());
        const { data } = await api.fetchPosts(page,subgenrename,genrename);

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





export const CommentPost = (value, id) => async (dispatch) => {
    try {
        const {data} = await api.comment(value,id);
        dispatch(COMMENT(data));
        return data.comments;
    } catch (error) {
        console.log(error);
    }
}

export const DeleteComment= (commentId, id) => async (dispatch) => {
    try {
        const { data } = await api.deleteComment(commentId, id);

        dispatch(COMMENT(data));
        
        return data.comments;
    } catch (error) {
        console.log(error);
    }
}


export const LikeComment = (commentId, id) => async (dispatch) => {
    try {
        const { data } = await api.likeComment(commentId, id);

        dispatch(COMMENT(data));
      
        
        return data.comments;
    } catch (error) {
        console.log(error);
    }
}

export const ReplyComment = (value, commentId, id) => async (dispatch) => {
    try {
        const { data } = await api.replyComment(value,commentId,id);


        dispatch(COMMENT(data));

        return data.comments;
    } catch (error) {
        console.log(error);
    }
}

export const LikeReply = (replyId,commentId, id) => async (dispatch) => {
    try {
        const { data } = await api.likeReply(replyId, commentId, id);

        dispatch(COMMENT(data));
      
        
        return data.comments;
    } catch (error) {
        console.log(error);
    }
}

export const DeleteReply = (replyId,commentId, id) => async (dispatch) => {
    try {
        const { data } = await api.deleteReply(replyId, commentId, id);

        dispatch(COMMENT(data));
      
        
        return data.comments;
    } catch (error) {
        console.log(error);
    }
}