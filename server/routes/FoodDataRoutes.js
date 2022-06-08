import express from 'express';

import { getFoodData, getSpoonacularData, getSpoonacularSpecificData } from '../controllers/FoodDataAPI.js';

const router = express.Router();

router.get('/search/:query',getFoodData);
//http://localhost:4001/film/search/john

router.get('/lookup/:query',getSpoonacularData);
//http://localhost:4001/food/lookup/salmon

router.get('/find/:query',getSpoonacularSpecificData);
//http://localhost:4001/food/find/salmon

export default router;