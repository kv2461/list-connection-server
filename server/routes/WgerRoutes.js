import express from 'express';

import { getExerciseData } from '../controllers/WgerAPI.js';

const router = express.Router();

router.get('/search/:query',getExerciseData);
//http://localhost:4001/exercise/search/bicep

export default router;