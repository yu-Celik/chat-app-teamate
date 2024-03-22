import express from 'express';
import { registerUser, loginUser, findUser, getAllUsersExceptLoggedIn, logout, verifyUser } from '../Controllers/user.controller.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();

router.post('/register', registerUser); // Create a user
router.post('/login', loginUser); // Login a user
router.get('/find/:userId', protectRoute, findUser); // Find a user
router.get('/', protectRoute, getAllUsersExceptLoggedIn); // Find all users except logged in user
router.post('/logout', logout); // Logout a user
router.get('/verify',protectRoute, verifyUser); // Verify a user 


export default router;

// Path: server/Routes/userRoute.js
