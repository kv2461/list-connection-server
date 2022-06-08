import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export const getFilmData = async (req,res) => {
    const { query } = req.params;
    const api_key = process.env.TMDB_APIKEY_V3;
    const pageSize = 6
    const api_url = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${query}`

    try {

        axios.get(api_url)
        .then((response)=> {
            res.status(200).json(response.data);
        })

    } catch (error) {
        res.status(404).json({message:error.message})
    }
}