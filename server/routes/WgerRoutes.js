import express from 'express';

import { getExerciseData } from '../controllers/WgerAPI.js';

const router = express.Router();

router.get('/search/',getExerciseData);
//http://localhost:4001/exercise/search/?query=bicep

export default router;