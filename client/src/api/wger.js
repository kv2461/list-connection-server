import axios from 'axios';

const API = axios.create({ baseURL : 'https://list-connection.herokuapp.com/exercise/search' });

// export const getFoodSuggestions = (query) => API.get(`/${query}`);

export const getWorkout = (query) => API.get(`/?query=${query}`);
