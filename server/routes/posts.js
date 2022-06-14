import express from 'express';

import { getPostsBySearch, getPost, getPosts,createPost,updatePost,deletePost,likePost, commentPost, deleteComment, likeComment, replyComment} from '../controllers/posts.js';

import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/search',getPostsBySearch);
// router.get('/categories',getPostsBySubgenre); //not sure if i want to keep this name
router.get('/',getPosts);
router.get('/:id', getPost)

router.post('/',auth,createPost);
router.patch('/:id',auth,updatePost);
router.delete('/:id',auth,deletePost);
router.patch('/:id/likePost',auth,likePost);


router.post('/:id/commentPost',auth, commentPost); 
router.patch('/:id/commentPost', auth, deleteComment);
router.patch('/:id/commentPost/like', auth, likeComment);
router.patch('/:id/commentPost/reply', auth, replyComment);

export default router;