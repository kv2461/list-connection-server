import express from 'express';

import { getFoodData, getSpoonacularData, getSpoonacularSpecificData } from '../controllers/FoodDataAPI.js';

const router = express.Router();

router.get('/search/:query',getFoodData);

router.get('/lookup/:query',getSpoonacularData);

router.get('/find/:query',getSpoonacularSpecificData);

export default router;