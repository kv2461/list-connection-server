import { UPDATE, AUTH } from '../reducers/auth';
import { ACCOUNT_INFO, USER_INFO, CHAT_INFO, START_CHAT_LOADING, END_CHAT_LOADING, PREVIEW, MESSAGE} from '../reducers/account';
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

export const GetChatById = (id) => async (dispatch) => {

    try {
        if (id) {
        const { data } = await api.getChatById(id);
       
        dispatch(CHAT_INFO(data))
        }
        // return data;
    } catch (error) {
        console.log(error);
    }

}

export const GetChatByIdPreview = (id) => async (dispatch) => {

    try {
        if (id) {
        const { data } = await api.getChatById(id);
       
        dispatch(PREVIEW(data));
        }

    } catch (error) {
        console.log(error);
    }

}

export const GetInfoById = (id) => async (dispatch) => {
    
    try {
        if (id) {
        const { data } = await api.getInfoById(id);

        return data;
        // dispatch(USER_INFO(data))
        }
    } catch (error) {
        console.log(error);
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
        dispatch(START_CHAT_LOADING());
        const { data } = await api.messageUser(messageId, value);
        dispatch(END_CHAT_LOADING());
        dispatch(MESSAGE(data.newChat));
    } catch(error) {
        console.log(error);
    }

}

export const GetAccountInfo = () => async (dispatch) => {

    try {
        const { data } = await api.getAccountInfo();
       

        dispatch(ACCOUNT_INFO(data))
    } catch (error) {
        console.log(error);
    }

}

