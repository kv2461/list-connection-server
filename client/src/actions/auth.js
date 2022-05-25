import { AUTH } from '../reducers/auth';

import * as api from '../api';

export const SignIn = (formData,navigate) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);

        dispatch(AUTH({data}));

        navigate('/');
    } catch (error) {
        console.log(error)
    }
}

export const SignUp = (formData,navigate) => async (dispatch) => {
    try {
        const {data} = await api.signUp(formData);

        dispatch(AUTH({data}));

        navigate('/');
    } catch (error){

        console.log(error);
    }

}