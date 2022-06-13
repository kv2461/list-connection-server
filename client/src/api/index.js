import axios from 'axios';

const API = axios.create({ baseURL : 'http://localhost:4001' });

API.interceptors.request.use((req)=> {
    if(localStorage.getItem('profile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
})

export const fetchPost = (id) => API.get(`/posts/${id}`);

export const fetchPosts = (page,subgenrename,genrename) => API.get(`/posts?page=${page || 1}&subgenrename=${subgenrename|| ''}&genrename=${genrename || ''}`);

export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`)

export const createPost = (newPost) => API.post('/posts',newPost);

export const updatePost = (id,updatedPost) => API.patch(`/posts/${id}`,updatedPost);

export const deletePost = (id) =>API.delete(`/posts/${id}`);

export const likePost = (id) => API.patch(`/posts/${id}/likePost`);





export const comment = (value,id) => API.post(`/posts/${id}/commentPost`, { value });

export const deleteComment = (commentId, id) => API.patch(`/posts/${id}/commentPost`, { commentId });





export const signIn = (formData) => API.post('/user/signin',formData);

export const signUp = (formData) => API.post('/user/signup',formData);