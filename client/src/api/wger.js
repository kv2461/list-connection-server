import axios from 'axios';

const API = axios.create({ baseURL : 'http://localhost:4001/exercise/search' });

// export const getFoodSuggestions = (query) => API.get(`/${query}`);

export const getWorkout = (query) => API.get(`/?query=${query}`);
