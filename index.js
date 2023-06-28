import RedisStore from 'connect-redis';
import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import { createClient } from 'redis';
import env from './config/config.js';
import postRoute from './routes/postRoute.js';
import userRoute from './routes/userRoute.js';

const app = express();
app.use(express.json());

const MONGO_URL = `mongodb://${env.MONGO_USER}:${env.MONGO_PASSWORD}@${env.MONGO_IP}:${env.MONGO_PORT}/?authSource=admin`;

mongoose
	.connect(MONGO_URL)
	.then(() => console.log('db connected!!'))
	.catch((err) => console.log(err));

// Initialize client.
let redisClient = createClient({
	url: `redis://${env.REDIS_URL}:${env.REDIS_PORT}`,
});
redisClient
	.connect()
	.then(() => console.log('redis connected....'))
	.catch(console.error);

// Initialize store.
let redisStore = new RedisStore({
	client: redisClient,
	prefix: 'myapp:',
});

// Initialize sesssion storage.
app.use(
	session({
		// resave: false,
		// saveUninitialized: false,
		store: redisStore,
		secret: env.SESSION_SECRET,
		cookie: {
			maxAge: 60000,
			secure: false,
			httpOnly: true,
		},
	})
);

app.get('/', (_, res) => {
	res.status(200).json({
		status: 'OKK',
	});
});
app.get('/test', (req, res) => {
	res.status(200).json({
		status: 'OKK',
		route: req.originalUrl,
	});
});

app.use('/posts', postRoute);
app.use('/users', userRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`App running on port ${PORT}`);
});
