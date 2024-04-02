
import express from 'express';
import { createChat, findUserChats, findChat, deleteChat, getChat } from '../Controllers/chat.controller.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();

router.post('/', protectRoute, createChat); // Create a chat
router.get('/findUserChats', protectRoute, findUserChats); // Find all chats of a user
router.get('/find/:secondUserId', protectRoute, findChat); // Find a chat between two users
router.delete('/:chatId', protectRoute, deleteChat); // Delete a chat
router.get('/:id', protectRoute, getChat); // Get a chat


export default router;
