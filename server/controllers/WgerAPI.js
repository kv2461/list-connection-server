import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export const getExerciseData = async (req,res) => {
    const { query } = req.params;
    const api_key = process.env.WGER_APIKEY;
    const api_url = 
    `https://wger.de/api/v2/exercise/search/?term=${query}`

    try {

        axios.get(api_url, {headers: {authorization: `token ${api_key}`}})
        .then((response) => {
            res.status(200).json(response.data);
        })

    } catch (error) {
        res.status(404).json({message:error.message})
    }
}