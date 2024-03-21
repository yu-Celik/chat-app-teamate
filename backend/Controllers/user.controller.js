import UserModel from '../Models/user.model.js';
import bcrypt from 'bcrypt';
import generateTokenAndSetCookie from '../utils/generateToken.js';
import validator from 'validator';


const registerUser = async (req, res) => {
    try {
        const { username, email, password, gender, confirmPassword } = req.body;
        let user = await UserModel.findOne({ email });

        if (user) {
            return res.status(400).json({ error: 'Un utilisateur avec cette adresse email existe déjà' });
        }
        if (!username || !email || !password || !gender) {
            return res.status(400).json({ error: 'Veuillez remplir tous les champs' });
        }
        
        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: 'Une adresse email valide est requise' });
        }
        
        if (!validator.isLength(username, { min: 3, max: 15 })) {
            return res.status(400).json({ error: 'Le nom d\'utilisateur doit contenir entre 3 et 15 caractères' });
        }
        
        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({ error: 'Le mot de passe doit contenir au moins 8 caractères et contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial' });
        }
        
        if (password !== confirmPassword) {
            return res.status(400).json({ error: 'Les mots de passe ne correspondent pas' });
        }
        
        if (!validator.isAlpha(gender)) {
            return res.status(400).json({ error: 'Genre invalide' });
        }

        if (!validator.isAlpha(gender)) {
            return res.status(400).json('Genre invalide');
        }
        // hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // generate profile picture
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new UserModel({
            username,
            password: hashedPassword,
            email,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
        })

        if (newUser) {
            // generate JWT token
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();

            res.status(200).json({
                _id: newUser._id,
                email: newUser.email,
                username: newUser.username,
                profilePic: newUser.profilePic,
            });

        } else {
            res.status(400).json({ error: "Invalid user data" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (!user) return res.status(400).json('Invalid email or password');
        const isValidPassword = await bcrypt.compare(password, user.password || '');
        if (!isValidPassword) return res.status(400).json('Invalid email or password');
        generateTokenAndSetCookie(user._id, res);
        res.status(200).json({ _id: user._id, email });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

const findUser = async (req, res) => {
    const userId = req.params.userId;
    try {
        const user = await UserModel.findById(userId);
        if (!user) return res.status(404).json('User not found');
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
const getUsers = async (req, res) => {
    try {
        const users = await UserModel.find();
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

export const logout = (_, res) => {
    try {
        res.cookie('jwt', '', { maxAge: 1 }); // Efface le cookie
        res.redirect('/'); // Redirige l'utilisateur après la déconnexion
        res.status(200).json({ message: "User logged out successfully" });
    }
    catch (error) {
        console.error('Error logging out user', error.message);
        res.status(500).json({ error: "Something went wrong" });
    }
};



export { registerUser, loginUser, findUser, getUsers };
