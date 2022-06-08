import * as api from '../api/foodcentral';

export const GetFoodSuggestions = (query) => async (dispatch) => {
    try {
        if (query.length > 0) {
        const { data } = await api.getFoodSuggestions(query);

        return data;
        }
        
    } catch (error) {
        console.log(error)
    }
}