import * as api from '../api/yoga';

export const GetYogaPose = (query) => async (dispatch) => {
    try {
        console.log(query);
        const { data } = await api.getYogaPose(query);
        console.log(data);
        return data;
    } catch (error) {
        console.log(error)
    }
}