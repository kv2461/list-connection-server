import { UPDATE, AUTH } from '../reducers/auth';
import { START_LOADING_FOLLOW, END_LOADING_FOLLOW } from '../reducers/posts';

import * as api from '../api';

export const UpdateUser = (id, value) => async (dispatch) => {
    try {
        
        const { data } = await api.updateUser(id,value);

        console.log(data);
        // dispatch(AUTH(data));
        return data;
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


export const FollowUser = (followId) => async (dispatch) => {

    try {
        dispatch(START_LOADING_FOLLOW());
        const { data } = await api.followUser(followId);
        dispatch(END_LOADING_FOLLOW());
        return data;
 
    } catch(error) {
        console.log(error);
    }

}

export const MessageUser = (messageId, value) => async (dispatch) => {

    try {
        const { data } = await api.messageUser(messageId, value);

        return data;
    } catch(error) {
        console.log(error);
    }

}