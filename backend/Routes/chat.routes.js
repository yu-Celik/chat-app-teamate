
import express from 'express';
import { createChat, findUserChats, findChat } from '../Controllers/chat.controller.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();

router.post('/', protectRoute, createChat); // Create a chat
router.get('/findUserChats', protectRoute, findUserChats); // Find all chats of a user
router.get('/find/:firstId/:secondId', protectRoute, findChat); // Find a chat between two users

export default router;
