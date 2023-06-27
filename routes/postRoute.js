import express from 'express';
import {
	createPost,
	deletePost,
	getAllPosts,
	getPostById,
	updatePost,
} from '../controllers/postController.js';

const router = express.Router();

router.route('/').get(getAllPosts).post(createPost);
router.route('/:id').get(getPostById).patch(updatePost).delete(deletePost);
export default router;
