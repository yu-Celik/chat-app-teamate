import { getReceiverSocketIds, getUserOpenConversations, io } from './socket.js';
import MessageModel from '../Models/message.model.js';

// Cette fonction émet un événement à tous les sockets associés à un userId donné
const emitToUser = (userId, event, data) => {
    const socketIds = getReceiverSocketIds(userId);
    socketIds.forEach(socketId => {
        io.to(socketId).emit(event, data);
    });
};

export const notifyNewMessage = async (senderId, receiverId, message) => {
    emitToUser(receiverId, 'newMessage', message);
    const openConversations = getUserOpenConversations(receiverId);
    console.log(`les conversations ouverte sont ${openConversations}`);
    console.log(`L'id du message est ${message._id}`);
    console.log(`L'id du chat est ${message.chatId}`);
    if (openConversations.map(String).includes(String(message.chatId))) {
        if (receiverId === message.receiverId) {
            // console.log(`Le message ${message._id} du chat ${message.chatId} a été marqué comme lu par ${receiverId} pour ${senderId}`);
            await MessageModel.findOneAndUpdate(
                { _id: message._id },
                { read: true, readAt: new Date() }
            );
            // Émettre un événement pour indiquer que le message a été marqué comme lu
            emitToUser(receiverId, 'messageRead', { chatId: message.chatId, message });
            if (senderId !== receiverId) {
                console.log('re');
                emitToUser(senderId, 'messageRead', { chatId: message.chatId, message });
            }
        }
    }
    if (senderId !== receiverId) {
        emitToUser(senderId, 'newMessage', message);
    }
};

export const notifyEditMessage = (senderId, receiverId, message) => {
    emitToUser(receiverId, 'editMessage', message);

    if (senderId !== receiverId) {
        emitToUser(senderId, 'editMessage', message);
    }
};

export const notifyDeleteMessage = (senderId, receiverId, message) => {
    emitToUser(receiverId, 'deleteMessage', message);

    if (senderId !== receiverId) {
        emitToUser(senderId, 'deleteMessage', message);
    }
};

export const notifyNewChat = (senderId, receiverId, chat) => {
    emitToUser(receiverId, 'newChat', chat);

    if (senderId !== receiverId) {
        emitToUser(senderId, 'newChat', chat);
    }
};

export const notifyDeleteChat = (senderId, receiverId, chat) => {
    emitToUser(receiverId, 'deleteChat', chat);

    if (senderId !== receiverId) {
        emitToUser(senderId, 'deleteChat', chat);
    }
};
export const notifyMarkAllMessagesAsRead = (chatId, messageIds, receiverId, senderId) => { // ChatId est l'id du chat, messageIds est un tableau d'id de messages, receiverId est l'id du destinataire, senderId est l'id de l'expéditeur
    // console.log(`Le chat ${chatId} et les messages ${messageIds} ont été marqués comme lus par ${receiverId} pour ${senderId}`);

    emitToUser(receiverId, 'messagesAsRead', { chatId, messageIds });
    if (senderId !== receiverId) {
        emitToUser(senderId, 'messagesAsRead', { chatId, messageIds });
    }
};

export const notifyCreateUser = (user) => {
    io.emit('createUser', user);
};