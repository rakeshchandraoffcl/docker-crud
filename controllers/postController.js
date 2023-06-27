import Post from '../models/postModel.js';

export const getAllPosts = async (req, res, next) => {
	try {
		const posts = await Post.find();
		res.status(200).json({
			posts,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: 'unable to fetch',
		});
	}
};
export const getPostById = async (req, res, next) => {
	try {
		const post = await Post.findById(req.params.id);
		res.status(200).json({
			post,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: 'unable to fetch',
		});
	}
};
export const createPost = async (req, res, next) => {
	try {
		const post = await Post.create(req.body);
		res.status(200).json({
			post,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: 'unable to create',
		});
	}
};
export const updatePost = async (req, res, next) => {
	try {
		const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		res.status(200).json({
			post,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: 'unable to update',
		});
	}
};
export const deletePost = async (req, res, next) => {
	try {
		const post = await Post.findByIdAndDelete(req.params.id);
		res.status(200).json({
			post,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: 'unable to delete',
		});
	}
};
