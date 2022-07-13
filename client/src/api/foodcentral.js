import axios from 'axios';

const API = axios.create({ baseURL : 'https://list-connection.herokuapp.com/food/search/' });

// export const getFoodSuggestions = (query) => API.get(`/${query}`);

export const getSpoonacularSuggestions = (query) => API.get(`/?query=${query}`);

export const getSpoonacularInfo = (id) => API.get(`/${id}`);
