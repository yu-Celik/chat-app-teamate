/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import MessageModel from '../Models/message.model.js';
import { S3, PutObjectCommand } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import s3 from '../config/s3.config.js';
import { getUserNameById } from '../utils/userHelpers.js'; // Fonctions hypothétiques pour vérifier l'activité de l'utilisateur et obtenir le nom
import NotificationModel from '../Models/notifications.model.js';
// import activeUsers from '../socket/socket.js';


dotenv.config();

// createMessage
const createMessage = async (req, res) => {
    const { chatId, senderId, text } = req.body;
    const replyTo = req.body.replyTo || null;
    const { receiverId } = req.params;
    const imageFiles = req.files;
    const imageUrls = [];

    // Traitement de l'upload des images
    if (imageFiles && imageFiles.length > 0) {
        for (const file of imageFiles) {
            const params = {
                Bucket: 'teamate-chat',
                Key: uuidv4() + path.extname(file.originalname),
                Body: file.buffer,
            };

            try {
                await s3.send(new PutObjectCommand(params));
                const imageUrl = `https://${params.Bucket}.s3.amazonaws.com/${params.Key}`;
                imageUrls.push(imageUrl);
            } catch (error) {
                console.error('Error uploading file:', error);
                return res.status(500).json({ message: 'Error uploading file', error: error });
            }
        }
    }

    // Création du message
    const message = new MessageModel({
        chatId,
        senderId,
        text,
        replyTo,
        read: false,
        imageUrls,
        replyTo,
        edited: false,
    });

    try {
        const response = await message.save();
        // Vérifier si le destinataire est actif dans la conversation spécifique
        const isActive = activeUsers[chatId]?.has(receiverId);

        if (!isActive) {
            const senderName = await getUserNameById(senderId);
            const notification = new NotificationModel({
                receiverId,
                title: `Nouveau message de ${senderName}`,
                message: text,
                dateSent: new Date(),
                read: false
            });

            await notification.save();
        }

        // Envoyer la réponse après avoir traité la notification
        return res.status(200).json(response);
    } catch (error) {
        console.error('Error saving message:', error);
        // S'assurer qu'aucune réponse n'a été envoyée avant d'envoyer une erreur
        if (!res.headersSent) {
            return res.status(500).json({ message: 'Error saving message', error: error });
        }
    }
};

// getMessages
const getMessages = async (req, res) => {
    const { chatId } = req.params;
    try {
        const messages = await MessageModel.find({ chatId });
        if (messages !== null) {
            res.status(200).json(messages);
        } else {
            res.status(404).json({ messages: 'Messages not found' });
        }
    } catch (error) {
        res.status(500).json(error);
    }
};


// editMessage
const editMessage = async (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
    try {
        const message = await MessageModel.findByIdAndUpdate(id, { text, edited: true }, { new: true });
        if (message !== null) {
            res.status(200).json(message);
        } else {
            res.status(404).json({ message: 'Message not found' });
        }
    } catch (error) {
        console.error('Error updating message:', error);
        res.status(500).json(error);
    }
};

const deleteMessage = async (req, res) => {
    const { id } = req.params;
    try {
        const message = await MessageModel.findOneAndDelete({ _id: id });
        if (message !== null) {
            res.status(200).json({ message: 'Message deleted successfully', data: message });
        } else {
            res.status(404).json({ message: 'Message not found' });
        }
    } catch (error) {
        console.error('Error deleting message:', error);
        res.status(500).json(error);
    }
};

const deleteImageUrl = async (req, res) => {
    const { id } = req.params;
    const { imageUrl } = req.body;
    try {
        console.log('id:', id);
        console.log('imageUrl:', imageUrl);
        const message = await MessageModel.findById(id);
        if (message !== null) {
            const index = message.imageUrls.indexOf(imageUrl);
            if (index !== -1) {
                message.imageUrls.splice(index, 1);
                const updatedMessage = await message.save();
                console.log('Image URL deleted successfully:', updatedMessage);
                res.status(200).json({ message: 'Image URL deleted successfully', data: updatedMessage });
            } else {
                res.status(404).json({ message: 'Image URL not found in the message' });
            }
        } else {
            res.status(404).json({ message: 'Message not found' });
        }
    } catch (error) {
        console.error('Error deleting image URL:', error);
        res.status(500).json(error);
    }
};

const markMessageAsRead = async (req, res) => {
    const { id } = req.params; // ID du message
    try {
        const message = await MessageModel.findByIdAndUpdate(id, { read: true }, { new: true });
        if (message) {
            res.status(200).json({ message: 'Message marked as read', data: message });
        } else {
            res.status(404).json({ message: 'Message not found' });
        }
    } catch (error) {
        console.error('Error marking message as read:', error);
        res.status(500).json(error);
    }
};

const searchMessages = async (req, res) => {
    const { chatId, searchText } = req.query;
    try {
        const messages = await MessageModel.find({
            chatId,
            text: { $regex: searchText, $options: "i" },
        });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la recherche des messages", error });
    }
};
// const searchMessages = async (req, res) => {
//     const { chatId } = req.params;
//     const searchText = req.query.searchText || ''; // Récupère le texte de recherche depuis les paramètres de la requête, si présent

//     try {
//         // Utilise une expression régulière pour une recherche insensible à la casse
//         const messages = await MessageModel.find({
//             chatId,
//             text: { $regex: searchText, $options: 'i' }
//         });

//         if (messages.length > 0) { // Vérifie si le tableau des messages n'est pas vide
//             res.status(200).json(messages);
//         } else {
//             res.status(404).json({ message: 'Messages not found' });
//         }
//     } catch (error) {
//         console.error('Error fetching messages:', error);
//         res.status(500).json({ message: 'Error fetching messages', error });
//     }
// };

export {
    createMessage,
    getMessages,
    deleteMessage,
    editMessage,
    deleteImageUrl,
    markMessageAsRead,
    searchMessages,
};


// Pour enrichir votre application de chat, vous pourriez envisager d'ajouter les fonctionnalités suivantes :
// 1. Marquer les messages comme lus : Ajoutez une fonctionnalité pour marquer les messages comme lus une fois qu'ils ont été affichés à l'utilisateur. Cela pourrait impliquer la mise à jour d'un champ read dans votre modèle de message.
// 2. Réponses aux messages : Permettez aux utilisateurs de répondre spécifiquement à des messages dans une conversation. Cela pourrait nécessiter l'ajout d'un champ replyTo dans votre modèle de message qui référencerait l'ID du message auquel il répond.
// 3. Recherche de messages : Implémentez une fonctionnalité de recherche permettant aux utilisateurs de rechercher des messages par texte dans une conversation.
// 4. Pagination des messages : Pour améliorer les performances et l'expérience utilisateur dans les conversations avec un grand nombre de messages, implémentez la pagination des messages.
// 5. Envoi de notifications : Envoyez des notifications aux utilisateurs lorsqu'ils reçoivent de nouveaux messages ou lorsque d'autres événements importants se produisent dans l'application.
// 6. Gestion des groupes : Permettez la création de groupes de chat où les utilisateurs peuvent envoyer des messages à plusieurs personnes à la fois.
// 7. Ajout/Suppression de participants dans les groupes : Offrez la possibilité d'ajouter ou de supprimer des participants dans les conversations de groupe.
// Envoi de fichiers et de médias : Améliorez la gestion des fichiers et des médias pour permettre aux utilisateurs d'envoyer non seulement des images mais aussi d'autres types de fichiers comme des documents PDF, des vidéos, etc.
// 9. Statut en ligne/Hors ligne des utilisateurs : Montrez le statut en ligne ou hors ligne des utilisateurs pour indiquer leur disponibilité.
// 10. Messages éphémères : Implémentez des messages qui disparaissent après avoir été vus ou après un certain temps.
// Pour implémenter ces fonctionnalités, vous devrez probablement étendre vos modèles de données, ajuster vos contrôleurs et peut-être utiliser des services supplémentaires pour la gestion des fichiers, les notifications, etc.

// const getMessages = async (req, res) => {
//     const { chatId } = req.params;
//     const { page = 1, limit = 10 } = req.query; // Pagination
//     try {
//         const messages = await MessageModel.find({ chatId })
//             .sort({ createdAt: -1 })
//             .limit(limit * 1)
//             .skip((page - 1) * limit);
//         res.json(messages);
//     } catch (error) {
//         res.status(500).json({ message: "Erreur lors de la récupération des messages", error });
//     }
// };

// const createGroupChat = async (req, res) => {
//     const { members } = req.body; // Un tableau d'identifiants d'utilisateurs
//     try {
//         const newChat = new ChatModel({ members });
//         await newChat.save();
//         res.status(201).json(newChat);
//     } catch (error) {
//         res.status(500).json({ message: "Erreur lors de la création du groupe", error });
//     }
// };