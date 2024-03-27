import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    chatId: {
        type: mongoose.Schema.Types.ObjectId, ref: "Chat", required: true, index: true
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true
    },
    replyTo: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Message', default: null
    },
    message: {
        type: String, required: true,
    },
    messageType: {
        type: String, enum: ['text', 'image', 'video', 'mixed'], default: 'text'
    },
    read: {
        type: Boolean, default: false
    },
    edited: {
        type: Boolean, default: false
    },
    imageUrls: {
        type: [String],
        default: [],
    },
    readAt: {
        type: Date
    },
    editedAt: {
        type: Date
    },

}, { timestamps: true });

const MessageModel = mongoose.model('Message', messageSchema);

export default MessageModel;
