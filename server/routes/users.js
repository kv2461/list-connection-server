import express from 'express';

import { signin, signup, updateUser, getInfoByUsername, followUser, messageUser } from '../controllers/users.js';

import auth from '../middleware/auth.js';


const router = express.Router();

router.post('/signin',signin);
router.post('/signup',signup);


router.patch('/update/:id', auth, updateUser);
router.get('/info/:username', getInfoByUsername);
router.patch('/follow/:followId', auth, followUser);
router.patch('/message/:messageId', auth, messageUser);

export default router;