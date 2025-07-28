import express from 'express';
import { signupUser, loginUser, getAllUsers } from '../controllers/userController.js';

const router = express.Router();

router.post('/signup', signupUser);
router.post('/login', loginUser);
router.get('/', getAllUsers); // 👈 Final route for GET /api/users

export default router;