import express from 'express';

import { signin, signup, updateUser, getInfoByUsername, followUser, messageUser, getAccountInfo, getInfoById} from '../controllers/users.js';

import auth from '../middleware/auth.js';


const router = express.Router();

router.post('/signin',signin);
router.post('/signup',signup);


router.patch('/update/:id', auth, updateUser);
router.get('/info/id/:id', auth, getInfoById);
router.get('/info/:username', getInfoByUsername);
router.patch('/follow/:followId', auth, followUser);
router.patch('/message/:messageId', auth, messageUser);
router.get('/account', auth, getAccountInfo);

export default router;