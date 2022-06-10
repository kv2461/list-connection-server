import * as api from '../api/wger';

export const GetWorkout = (term) => async (dispatch) => {
    try {
        const { data } = await api.getWorkout(term);

        return data;
    } catch (error) {
        console.log(error)
    }
}