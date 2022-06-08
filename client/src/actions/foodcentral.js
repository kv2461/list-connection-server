import * as api from '../api/foodcentral';

// export const GetFoodSuggestions = (query) => async (dispatch) => {
//     try {
//         if (query.length > 0) {
//         const { data } = await api.getFoodSuggestions(query);

//         return data;
//         }
        
//     } catch (error) {
//         console.log(error)
//     }
// }

export const GetSpoonacularSuggestions = (query) => async (dispatch) => {
    try {
        if (query.length > 0) {
            const { data } = await api.getSpoonacularSuggestions(query);

            return data;
        }
    } catch (error) {
        console.log(error)
    }
}
export const GetSpoonacularInfo = (id) => async (dispatch) => {
    try {
            const {data}  = await api.getSpoonacularInfo(id);

            return data;
    } catch (error) {
        console.log(error)
    }
}