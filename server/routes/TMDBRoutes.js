import express from 'express';

import { getFilmData } from '../controllers/TMDBAPI.js';

const router = express.Router();

router.get('/search/:query',getFilmData);

export default router;