import MessageModel from '../Models/message.model.js';
import { S3, PutObjectCommand } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import s3 from '../config/s3.config.js';
import Chat from '../Models/chat.model.js';
import { notifyDeleteMessage, notifyEditMessage, notifyNewMessage } from '../socket/socketService.js';


dotenv.config();

// Création d'un message grâce à l'id du chat, de l'expéditeur et du message
const createMessage = async (req, res) => {
    const senderId = req.user._id;
    const { chatId, message } = req.body;
    const replyTo = req.body.replyTo || null;
    const imageFiles = req.files; // Assurez-vous que votre middleware gère 'multipart/form-data'
    const imageUrls = [];

    console.log(chatId, senderId, message);
    if (!chatId || !senderId || !message) {
        return res.status(400).json({ message: 'L\'ID du chat, de l\'expéditeur et du message sont requis.' });
    }
    let chat;
    try {
        chat = await Chat.findById(chatId);
        if (!chat) {
            return res.status(404).json({ message: 'Chat non trouvé.' });
        }
    } catch (error) {
        console.error('Error finding chat:', error);
        return res.status(500).json({ message: 'Erreur lors de la recherche du chat.', error });
    }
    if (!chat.members.includes(senderId)) {
        return res.status(400).json({ message: 'L\'expéditeur est invalide.' });
    }
    // Déterminer le receiverId
    const receiverId = chat.members.find(member => member.toString() !== senderId.toString());
    if (!receiverId) {
        return res.status(404).json({ message: 'Destinataire non trouvé.' });
    }

    let determinedMessageType = 'text'; // Défaut à 'text'
    if (imageFiles && imageFiles.length > 0) {
        for (const file of imageFiles) {
            const fileExtension = path.extname(file.originalname);
            const fileName = uuidv4() + fileExtension;
            const params = {
                Bucket: s3Config.bucketName, // Assurez-vous que ce nom de seau est correct
                Key: fileName,
                Body: file.buffer,
            };

            try {
                await s3Config.client.send(new PutObjectCommand(params));
                const imageUrl = `https://${params.Bucket}.s3.amazonaws.com/${params.Key}`;
                imageUrls.push(imageUrl);
            } catch (uploadError) {
                console.error('Error uploading file:', uploadError);
                return res.status(500).json({ message: 'Error uploading file', error: uploadError });
            }
        }

        determinedMessageType = imageUrls.length > 0 ? (message ? 'mixed' : 'image') : 'text';
    }

    const newMessage = new MessageModel({
        chatId,
        senderId,
        receiverId,
        message,
        messageType: determinedMessageType,
        replyTo,
        imageUrls,
    });


    try {
        const savedMessage = await newMessage.save();
        notifyNewMessage(receiverId, savedMessage);
        return res.status(200).json(savedMessage);
    } catch (error) {
        console.error('Error saving message:', error);
        return res.status(500).json({ message: 'Erreur lors de l\'enregistrement du message.', error });
    }
};

// Récupération des messages d'un chat grâce à son id
const getMessages = async (req, res) => {
    console.log('getMessages');
    const { chatId } = req.params;

    if (!chatId) {
        return res.status(400).json({ message: "L'ID du chat est requis." });
    }

    try {
        const messages = await MessageModel.find({ chatId })
            .sort({ createdAt: -1 }) // Tri par date de création décroissante
            .exec();

        return res.status(200).json(messages);
    } catch (error) {
        console.error('Error retrieving messages:', error);
        return res.status(500).json({ message: 'Erreur lors de la récupération des messages.', error });
    }
};

const getLastMessageSeen = async (req, res) => {
    console.log('getLastMessageSeen');

    try {
        // Récupère tous les messages où l'utilisateur est soit l'expéditeur soit le destinataire
        const messages = await MessageModel.find({
            $or: [
                // Si l'utilisateur est l'expéditeur
                { senderId: req.user._id },
                // Si l'utilisateur est le destinataire
                { receiverId: req.user._id }
            ]
        })
            .sort({ createdAt: -1 }) // Tri par date de création décroissante
            .exec();

        // Crée un objet pour stocker le dernier message de chaque chat
        let lastMessagesByChat = {};

        messages.forEach(message => {
            // Si le chat n'est pas déjà dans l'objet, ou si le message est plus récent, l'ajoute/mise à jour
            if (!lastMessagesByChat[message.chatId] || lastMessagesByChat[message.chatId].createdAt < message.createdAt) {
                lastMessagesByChat[message.chatId] = message;
            }
        });

        // Convertit l'objet en tableau de messages
        const lastMessages = Object.values(lastMessagesByChat);

        return res.status(200).json(lastMessages);
    } catch (error) {
        console.error('Error retrieving messages:', error);
        return res.status(500).json({ message: 'Erreur lors de la récupération des messages.', error });
    }
}


// editMessage
const editMessage = async (req, res) => {
    const { id } = req.params;
    const { message: newContent } = req.body;
    const senderId = req.user._id;


    if (!newContent.trim()) {
        return res.status(400).json({ message: 'Le contenu du message ne peut pas être vide.' });
    }

    try {
        const updatedMessage = await MessageModel.findOneAndUpdate(
            { _id: id, senderId: senderId }, // Critères de recherche
            { message: newContent, edited: true, editedAt: new Date() }, // Mise à jour
            { new: true } // Options pour retourner le document mis à jour
        );

        if (!updatedMessage) {
            return res.status(404).json({ message: 'Message non trouvé ou vous n\'êtes pas l\'expéditeur.' });
        }

        const receiverId = updatedMessage.receiverId;

        notifyEditMessage(receiverId, updatedMessage);
        res.status(200).json(updatedMessage);
    } catch (error) {
        console.error('Erreur lors de la mise à jour du message:', error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour du message', error });
    }
};

const deleteMessage = async (req, res) => {
    console.log('deleteMessage');
    const { id } = req.params;
    const senderId = req.user._id;
    try {
        // Tente de supprimer le message. Si le message n'existe pas ou si l'expéditeur ne correspond pas,
        const message = await MessageModel.findOneAndDelete({
            _id: id,
            senderId: senderId // Assure que seul l'expéditeur peut supprimer le message
        });

        // Si aucun message n'a été supprimé, renvoie un message d'erreur.
        if (!message) {
            return res.status(404).json({ message: 'Message non trouvé ou action non autorisée.' });
        }
        const receiverId = message.receiverId;
        notifyDeleteMessage(receiverId, message);
        res.status(200).json({ message: 'Message supprimé avec succès.' });
    } catch (error) {
        console.error('Erreur lors de la suppression du message:', error);
        res.status(500).json({ message: 'Erreur lors de la suppression du message', error });
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
    const { chatId, searchMessages } = req.query;
    try {
        const messages = await MessageModel.find({
            chatId,
            message: { $regex: searchMessages, $options: "i" },
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
    getLastMessageSeen
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