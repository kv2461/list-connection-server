import axios from 'axios';

const API = axios.create({ baseURL : 'https://itunes.apple.com' });

export const getMusicTrack = (term) => API.get(`search?term=${term}&entity=musicTrack&limit=4`);
