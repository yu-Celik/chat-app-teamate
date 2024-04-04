import UserModel from '../Models/user.model.js';
import bcrypt from 'bcrypt';
import generateTokenAndSetCookie from '../Utils/generateToken.js';
import validator from 'validator';
import jwt from 'jsonwebtoken';

const registerUser = async (req, res) => {
    console.log('registerUser');
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
            return res.status(400).json({ error: 'Veuillez saisir votre genre' });
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
                gender: newUser.gender,
                createdAt: newUser.createdAt,
                lastLogout: newUser.lastLogout    
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
    console.log('loginUser');
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (!user) return res.status(400).json({ error: 'Invalid email or password' });
        const isValidPassword = await bcrypt.compare(password, user.password || '');
        if (!isValidPassword) return res.status(400).json({ error: 'Invalid email or password' });
        generateTokenAndSetCookie(user._id, res);
        user.lastLogout = new Date();
        await user.save();
        res.status(200).json({
            _id: user._id,
            email,
            username: user.username,
            profilePic: user.profilePic,
            gender: user.gender,
            createdAt: user.createdAt,
            lastLogout: user.lastLogout
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

const findUser = async (req, res) => {
    console.log('findUser');
    const userId = req.params.userId;
    try {
        const user = await UserModel.findById(userId);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

const getAllUsersExceptLoggedIn = async (req, res) => {
    console.log('getAllUsersExceptLoggedIn');
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await UserModel.find({ _id: { $ne: loggedInUserId } }).select("-password");
        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error("Error in getAllUsersExceptLoggedIn: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

const logout = (req, res) => {
    console.log('logout');
    try {
        res.clearCookie('jwt'); // Efface le cookie
        res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        console.error('Error logging out user', error.message);
        res.status(500).json({ error: "Something went wrong" });
    }
};

const verifyUser = async (req, res) => {
    console.log('verifyUser');
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ message: "Non autorisé" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (!decoded) {
            return res.status(401).json({ message: "Token invalide" });
        }

        const user = await UserModel.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        res.status(200).json({ user });
    } catch (error) {
        console.error('Erreur lors de la vérification de l\'utilisateur', error.message);
        res.status(500).json({ error: "Erreur serveur" });
    }
};


export { registerUser, loginUser, findUser, getAllUsersExceptLoggedIn, logout, verifyUser };
