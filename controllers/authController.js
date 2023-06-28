import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';

export const signUp = async (req, res, next) => {
	try {
		const { username, password } = req.body;
		const hashedPassword = await bcrypt.hash(password, 12);
		const user = await User.create({
			username,
			password: hashedPassword,
		});
		req.session.user = {
			id: user.id,
			username: user.username,
		};
		res.status(201).json({
			status: 'success',
			user,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: 'unable to create',
		});
	}
};
export const login = async (req, res, next) => {
	try {
		const { username, password } = req.body;
		const user = await User.findOne({ username });
		if (!user) {
			return res.status(404).json({ msg: 'user not found' });
		}

		console.log(user);

		const isCorrctPassword = await bcrypt.compare(password, user.password);
		if (isCorrctPassword) {
			req.session.user = {
				id: user.id,
				username: user.username,
			};
			res.status(200).json({
				status: 'success',
				id: user.id,
			});
		} else {
			res.status(401).json({ msg: 'invalid creds' });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: 'unable to login',
		});
	}
};
