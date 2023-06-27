import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, 'username required'],
		unique: true,
	},
	password: {
		type: String,
		required: [true, 'password required'],
	},
});

const User = mongoose.model('User', userSchema);
export default User;
