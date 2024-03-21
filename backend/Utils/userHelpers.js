import UserModel from "../Models/user.model.js";


async function getUserNameById(userId) {
    const user = await UserModel.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }
    return user.username;
}

export { getUserNameById };

