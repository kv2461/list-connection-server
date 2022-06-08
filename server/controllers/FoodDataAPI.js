import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export const getFoodData = async (req,res) => {
    const { query } = req.params;
    const api_key = process.env.FOOD_DATA_APIKEY;
    // const query = 'cheddar cheese'
    // const dataType = ['Survey (FNDDS)']
    const pageSize = 6
    const api_url = 
`https://api.nal.usda.gov/fdc/v1/foods/search?query=${encodeURIComponent(query)}&pageSize=${encodeURIComponent(pageSize)}&api_key=${encodeURIComponent(api_key)}`

    try {

        axios.get(api_url)
        .then((response) => {
            res.status(200).json(response.data);
        })

    } catch (error) {
        res.status(404).json({message:error.message})
    }
}

export const getSpoonacularData = async (req,res) => {
    const { query } = req.params;
    const api_key = process.env.SPOONACULAR_APIKEY;

    const api_url = `https://api.spoonacular.com/food/ingredients/search?apiKey=${api_key}&query=${query}`

    try {
        axios.get(api_url)
        .then((response) => {
            res.status(200).json(response.data);
        })

    } catch (error) {
        res.status(404).json({message:error.message})
    }
}

export const getSpoonacularSpecificData = async (req,res) => {
    const { query } = req.params;
    const api_key = process.env.SPOONACULAR_APIKEY;

    const api_url = `https://api.spoonacular.com/food/ingredients/search?apiKey=${api_key}&query=${query}`


    try {
        axios.get(api_url)
        .then((response) => {
            const {id} = response.data.results[0];
            axios.get(`https://api.spoonacular.com/food/ingredients/${id}/information?apiKey=${api_key}&amount=1`)
            .then((response) => {
                res.status(200).json(response.data);
            });
        });

    } catch (error) {
        res.status(404).json({message:error.message})
    }
}