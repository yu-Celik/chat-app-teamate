import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
        expiresIn: '15d',
    });
    res.cookie('jwt', token, {
        httpOnly: true, // to prevent XSS attacks
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
        sameSite: 'strict', // to prevent CSRF attacks
        secure: process.env.NODE_ENV === 'production' // Envoyer le cookie sur HTTPS en production
        // secure : process.env.NODE_ENV !== 'development' // to only send the cookie over HTTPS in production

    });
}

export default generateTokenAndSetCookie;