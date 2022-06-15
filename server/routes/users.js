import express from 'express';

import { signin, signup, updateUser, getInfoByUsername, followUser } from '../controllers/users.js';

import auth from '../middleware/auth.js';


const router = express.Router();

router.post('/signin',signin);
router.post('/signup',signup);


router.patch('/update/:id', auth, updateUser);
router.get('/info/:username', getInfoByUsername);
router.patch('/follow/:followId', auth, followUser);


export default router;