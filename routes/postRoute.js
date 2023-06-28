import express from 'express';
import {
	createPost,
	deletePost,
	getAllPosts,
	getPostById,
	updatePost,
} from '../controllers/postController.js';
import { isAuthenticated } from '../middlewares/isAuthenticated.js';

const router = express.Router();

router.route('/').get(isAuthenticated, getAllPosts).post(createPost);
router.route('/:id').get(getPostById).patch(updatePost).delete(deletePost);
export default router;
