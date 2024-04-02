import express from 'express';
import multer from 'multer';
import { createMessage, getMessages, deleteMessage, editMessage, deleteImageUrl, markMessageAsRead, searchMessages, getLastMessageSeen } from '../Controllers/message.controller.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', protectRoute, upload.array('imageFiles'), createMessage); // Create a message
router.get('/getLastMessageSeen/', protectRoute, getLastMessageSeen); // Get the last message seen
router.get('/:chatId', protectRoute, getMessages); // Find all messages of a chat
router.delete('/:id', protectRoute, deleteMessage); // Delete a message
router.delete('/:id/imageUrls', protectRoute, deleteImageUrl); // Delete image URLs from a message
router.patch('/:id', protectRoute, editMessage); // Edit a message
router.patch('/markAsRead/:id', protectRoute, markMessageAsRead); // Mark a message as read
router.get('/search/:chatId', protectRoute, searchMessages); // Search message by chat ID


export default router;
