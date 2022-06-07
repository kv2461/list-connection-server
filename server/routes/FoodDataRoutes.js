import express from 'express';

import { getFoodData } from '../controllers/FoodDataAPI.js';

const router = express.Router();

router.get('/search/:query',getFoodData);

export default router;