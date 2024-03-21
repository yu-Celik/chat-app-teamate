import express from 'express';
import { registerUser, loginUser, findUser, getUsers, logout, verifyToken } from '../Controllers/user.controller.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();

router.post('/register', registerUser); // Create a user
router.post('/login', loginUser); // Login a user
router.get('/find/:userId', protectRoute, findUser); // Find a user
router.get('/', protectRoute, getUsers); // Find all users
router.post('/logout', logout); // Logout a user
router.get('/verify',protectRoute, verifyToken); // Verify a token


export default router;

// Path: server/Routes/userRoute.js
