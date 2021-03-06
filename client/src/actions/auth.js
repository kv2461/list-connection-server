import { AUTH } from '../reducers/auth';

import * as api from '../api';

export const SignIn = (formData,navigate, setError) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);

        dispatch(AUTH({data}));

        navigate('/');
    } catch (error) {
        setError(error.response.data.message);
        console.log(error);
    }
}

export const SignUp = (formData,navigate, setError) => async (dispatch) => {
    try {
        const {data} = await api.signUp(formData);

        dispatch(AUTH({data}));

        navigate('/');
    } catch (error){
        setError(error)
        console.log(error);

    }

}