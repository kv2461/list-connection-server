import express from 'express';

import { getFoodData, getSpoonacularData, getSpoonacularSpecificData, } from '../controllers/FoodDataAPI.js';

const router = express.Router();

// router.get('/search/:query',getFoodData);
//http://localhost:4001/food/search/john

router.get('/search/',getSpoonacularData);
//http://localhost:4001/food/search/?query=salmon

router.get('/search/:id',getSpoonacularSpecificData);
//http://localhost:4001/food/search/15076


export default router;