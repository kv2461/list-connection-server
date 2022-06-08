import axios from 'axios';

const API = axios.create({ baseURL : 'http://localhost:4001/food/search/' });

export const getFoodSuggestions = (query) => API.get(`/${query}`);

