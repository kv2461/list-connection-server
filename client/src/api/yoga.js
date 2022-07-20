import axios from 'axios';

const API = axios.create({ baseURL : 'https://yoga-api-kv.herokuapp.com/yoga/info' });

export const getYogaPose = (query) => API.get(`?query=${query}`);
