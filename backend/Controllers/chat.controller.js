// createChat

import ChatModel from '../Models/chat.model.js';
import UserModel from '../Models/user.model.js';

// Créer un chat entre deux utilisateurs grace a leurs id
const createChat = async (req, res) => {
    console.log('createChat');

    const userId = req.user._id; 
    const { secondUserId } = req.body;
    

    if (!userId || !secondUserId) {
        return res.status(400).json({ error: 'L\'ID de l\'utilisateur ou de son second utilisateur est requis.' });
    }
    try {
        // Vérifier si un chat existe déjà entre ces deux utilisateurs
        let chat = await ChatModel.findOne({
            members: { $all: [userId, secondUserId] },
        }).populate('members', '-password'); // Exclut le champ mot de passe dans les informations retournées

        if (chat) {
            chat = JSON.parse(JSON.stringify(chat)); // Convertir le document en JSON
            return res.status(200).json(chat);
        }

        // Créer un nouveau chat si aucun chat existant n'a été trouvé
        const newChat = new ChatModel({
            members: [userId, secondUserId],
        });

        // Sauvegarder le nouveau chat dans la base de données
        const savedChat = await newChat.save();

        // Récupérer le chat sauvegardé avec les informations des membres peuplées
        chat = await ChatModel.findById(savedChat._id).populate('members', '-password');

        // Retourner le chat nouvellement créé
        res.status(201).json(chat);
    } catch (error) {
        // Gérer les erreurs potentielles lors de la création du chat
        console.error('Erreur lors de la création du chat:', error);
        res.status(500).json({ message: 'Erreur lors de la création du chat', error });
    }
};
// Trouver tous les chats d'un utilisateur grace a son id
const findUserChats = async (req, res) => {
    console.log('findUserChats');
    const userId = req.user._id;
    try {
        // Trouver tous les chats où l'utilisateur est un membre et peupler les informations des membres, excluant les mots de passe
        const chats = await ChatModel.find({ members: userId })
            .populate('members', '-password') // Peuple les informations des membres, exclut le mot de passe
            .exec(); // Exécute la requête

        res.status(200).json(chats);
    } catch (error) {
        console.error('Erreur lors de la recherche des chats de l\'utilisateur:', error);
        res.status(500).json({ message: 'Erreur lors de la recherche des chats de l\'utilisateur', error });
    }
};
// Supprimé un chat grace a son id
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

// Récupérer un chat grace a son id
const getChat = async (req, res) => {
    const chatId = req.params.id; // Ou une autre manière de récupérer l'ID du chat

    try {
        const chat = await ChatModel.findById(chatId)
            .populate('members', '-password') // Peuple les informations des membres, exclut le mot de passe
            .exec();

        if (!chat) {
            return res.status(404).json({ message: 'Chat non trouvé.' });
        }

        res.json(chat);
    } catch (error) {
        console.error('Erreur lors de la récupération du chat:', error);
        res.status(500).json({ message: 'Erreur lors de la récupération du chat', error });
    }
};

// Trouver un chat entre deux utilisateurs grace a leurs id
const findChat = async (req, res) => {
    console.log('findChat');
    const userId = req.user._id;
    const { secondUserId } = req.params;
    try {
        const chat = await ChatModel.findOne({
            members: { $all: [userId, secondUserId] },
        });
        return res.status(200).json(chat);
    } catch (error) {
        res.status(500).json(error);
    }
};

export { createChat, findUserChats, findChat, deleteChat, getChat };
