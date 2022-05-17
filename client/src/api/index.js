import axios from 'axios';

const API = axios.create({ baseURL = 'http://localhost:4001' });

export const fetchPosts = () => API.get('/posts');

export const createPost = (newPost) => API.post('/posts',newPost);