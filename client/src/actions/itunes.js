// import { FETCH_ALL,CREATE,UPDATE,DELETE,LIKE } from '../reducers/posts';

import * as api from '../api/itunes';

export const GetMusicTrack = (term) => async (dispatch) => {
    try {
        const { data } = await api.getMusicTrack(term);

        return data;
    } catch (error) {
        console.log(error)
    }
}

export const GetMusicAlbum = (term) => async (dispatch) => {
    try {
        const { data } = await api.getMusicAlbum(term);

        return data;
    } catch (error) {
        console.log(error)
    }
}