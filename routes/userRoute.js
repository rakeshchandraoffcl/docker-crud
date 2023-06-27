import express from 'express';
import { login, signUp } from '../controllers/authController.js';

const router = express.Router();

router.route('/sign-up').post(signUp);
router.route('/login').post(login);
export default router;
