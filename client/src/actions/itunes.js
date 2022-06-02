// import { FETCH_ALL,CREATE,UPDATE,DELETE,LIKE } from '../reducers/posts';

import * as api from '../api/itunes';

export const GetMusicTrack = (term) => async (dispatch) => {
    try {
        console.log(term)
        const { data } = await api.getMusicTrack(term);

        // dispatch(FETCH_ALL(data));
        return data;
    } catch (error) {
        console.log(error)
    }
}