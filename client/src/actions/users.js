import { UPDATE, AUTH } from '../reducers/auth';

import * as api from '../api';

export const UpdateUser = (id, value) => async (dispatch) => {
    try {
        
        const { data } = await api.updateUser(id,value);

        console.log(data);
        // dispatch(AUTH(data));

    } catch (error) {
        console.log(error)
    }
}
export const GetInfoByUsername = (username) => async (dispatch) => {
    try {
        const { data } = await api.getInfoByUsername(username);

        return data;
    } catch(error) {
        console.log(error);
    }
}