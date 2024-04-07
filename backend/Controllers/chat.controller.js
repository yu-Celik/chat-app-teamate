import ChatModel from '../Models/chat.model.js';
import MessageModel from '../Models/message.model.js';
import { notifyDeleteChat, notifyNewChat } from '../socket/socketService.js';

// Créer un chat entre deux utilisateurs grace a leurs id
const createChat = async (req, res) => {
    console.log('createChat');

    const userId = req.user._id.toString();
    const { secondUserId } = req.body;
    console.log(userId, secondUserId);
    if (!userId || !secondUserId) {
        return res.status(400).json({ error: 'L\'ID de l\'utilisateur ou de son second utilisateur est requis.' });
    }
    try {
        // Vérifier si un chat existe déjà entre ces deux utilisateurs
        let chat = await ChatModel.findOne({
            members: { $all: [userId, secondUserId] },
        }).populate('members', '-password'); // Exclut le champ mot de passe dans les informations retournées

        if (chat) {
            console.log('Chat déjà existant');
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

        notifyNewChat(secondUserId, chat);
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

// Supprimé un chat grâce à son id
const deleteChat = async (req, res) => {
    console.log('deleteChat');
    const { chatId } = req.params;
    const currentUserId = req.user._id.toString(); // Assurez-vous que c'est une chaîne pour la comparaison

    try {
        const chat = await ChatModel.findById(chatId);
        if (!chat) {
            return res.status(404).json({ message: "Chat non trouvé." });
        }

        // Vérifie si l'utilisateur actuel est un membre du chat
        if (!chat.members.map(member => member.toString()).includes(currentUserId)) {
            return res.status(401).json({ message: "Vous n'êtes pas autorisé à supprimer ce chat." });
        }

        // Trouve l'ID du second utilisateur
        const secondUserId = chat.members.find(member => member.toString() !== currentUserId);

        // Supprime le chat et tous les messages associés
        await ChatModel.findByIdAndDelete(chatId);
        await MessageModel.deleteMany({ chatId: chat._id });

        notifyDeleteChat(secondUserId, chat);
        res.status(200).json({ message: "Chat et tous ses messages supprimés avec succès." });
    } catch (error) {
        console.error('Erreur lors de la suppression du chat et de ses messages:', error);
        res.status(500).json({ message: 'Erreur lors de la suppression du chat et de ses messages', error });
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
