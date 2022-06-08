import axios from 'axios';

const API = axios.create({ baseURL : 'http://localhost:4001/food/search/' });

// export const getFoodSuggestions = (query) => API.get(`/${query}`);

export const getSpoonacularSuggestions = (query) => API.get(`/?query=${query}`);

export const getSpoonacularInfo = (id) => API.get(`/${id}`);
