import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' 
    },
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    dateSent: {
        type: Date,
        default: Date.now
    },
    read: {
        type: Boolean,
        default: false
    }
});

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;