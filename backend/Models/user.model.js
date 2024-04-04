import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            min: 3,
            max: 30,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            min: 6,
            max: 200,
            unique: true,
            lowercase: true,
            index: true,
        },
        password: {
            type: String,
            required: true,
            min: 6,
            max: 1024,
        },
        gender: {
            type: String,
            required: true,
            enum: ['male', 'female']
        },
        profilePic: {
            type: String,
            default: "",
        },
        lastLogout: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    },
);

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
// Path: server/Models/userModel.js
