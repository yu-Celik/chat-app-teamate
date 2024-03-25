// createChat

import ChatModel from '../Models/chat.model.js';
import UserModel from '../Models/user.model.js';

const createChat = async (req, res) => {
    console.log('createChat');
    const user = req.user;
    const { secondId } = req.body;
    const secondUser = await UserModel.findById(secondId).select('-password');

    try {

        const chat = await ChatModel.findOne({
            members: { $all: [user, secondUser] },
        });
        if (chat) {
            return res.status(400).json({ error: 'Un chat avec ces deux utilisateurs existe déjà' });
        }
        const newChat = new ChatModel({
            members: [user, secondUser],
        });

        const response = await newChat.save();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(error);
    }
};

// findUserChats

const findUserChats = async (req, res) => {
    console.log('findUserChats');
    const userId = req.user._id;
    try {
        const chats = await ChatModel.find({ members: { $ne: userId } });
        res.status(200).json(chats);
    } catch (error) {
        res.status(500).json(error);
    }
};

const deleteChat = async (req, res) => {
    console.log('deleteChat');
    const { chatId } = req.params;
    try {
        const chat = await ChatModel.findByIdAndDelete(chatId);
        res.status(200).json(chat);
    } catch (error) {
        res.status(500).json(error);
    }
};


// findChat

const findChat = async (req, res) => {
    console.log('findChat');
    const { firstId, secondId } = req.params;
    try {
        const chat = await ChatModel.findOne({
            members: { $all: [firstId, secondId] },
        });
        return res.status(200).json(chat);
    } catch (error) {
        res.status(500).json(error);
    }
};

export { createChat, findUserChats, findChat, deleteChat };
