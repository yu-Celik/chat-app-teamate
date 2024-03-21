import Rocket from '../assets/rl.png';

export type User = {
    id: number; // Identifiant de l'utilisateur
    username: string; // Nom d'utilisateur de l'utilisateur
    email: string; // Email de l'utilisateur
    password: string; // Mot de passe de l'utilisateur
    gender: string | "male" | "female"; // Genre de l'utilisateur
    profilePic: string; // Photo de profil de l'utilisateur
    isOnline: boolean; // Statut de l'utilisateur
    lastSeen: string; // Dernière connexion de l'utilisateur
    notifications: number; // Nombre de notifications
    lastNotificationSeen: string; // Date de la dernière notification vue
};

export type Message = {
    chatId: string; // Identifiant du chat
    senderId: number; // Identifiant de l'envoyeur
    text: string; // Texte du message
    read: boolean; // Statut de lecture du message
    imageUrls: string[]; // URL des images du message
    replyTo: null | Message; // Message auquel le message répond
    edited: boolean; // Statut d'édition du message
}

export type Groupe = {
    id: number;
    name: string; // Nom du groupe
    members: User[]; // Membres du groupe
    messages: Message[]; // Messages du groupe
    lastMessage: string; // Dernier message du groupe
    lastNotificationSeen: string; // Date du dernier message
    lastMessageSender: User; // Auteur du dernier message
    profilePic: string; // Photo de profil du groupe
}

export type MessageGroupe = {
    chatId: string; // Identifiant du chat
    senderId: number; // Identifiant de l'envoyeur
    text: string; // Texte du message
    read: boolean; // Statut de lecture du message
    imageUrls: string[]; // URL des images du message
    replyTo: null | Message; // Message auquel le message répond
    edited: boolean; // Statut d'édition du message
}

export const users = [
    {
        id: 1,
        username: 'john_doe',
        email: 'john.doe@example.com',
        password: 'password123',
        gender: 'male',
        profilePic: 'https://avatar.iran.liara.run/public/boy?username=yu_cel',
        isOnline: false,
        lastSeen: new Date().toISOString(),
        notifications: 4,
        lastNotificationSeen: new Date().toISOString(),
    },
    {
        id: 2,
        username: 'john_doe',
        email: 'john.doe@example.com',
        password: 'password123',
        gender: 'male',
        profilePic: 'https://avatar.iran.liara.run/public/boy?username=yu_cel',
        isOnline: false,
        lastSeen: new Date().toISOString(),
        notifications: 0,
        lastNotificationSeen: new Date().toISOString(),
    },
    {
        id: 3,
        username: 'john_doe',
        email: 'john.doe@example.com',
        password: 'password123',
        gender: 'male',
        profilePic: 'https://avatar.iran.liara.run/public/boy?username=yu_cel',
        isOnline: false,
        lastSeen: new Date().toISOString(),
        notifications: 0,
        lastNotificationSeen: new Date().toISOString(),
    },
    {
        id: 4,
        username: 'john_doe',
        email: 'john.doe@example.com',
        password: 'password123',
        gender: 'male',
        profilePic: 'https://avatar.iran.liara.run/public/boy?username=yu_cel',
        isOnline: false,
        lastSeen: new Date().toISOString(),
        notifications: 0,
        lastNotificationSeen: new Date().toISOString(),
    },
    {
        id: 5,
        username: 'john_doe',
        email: 'john.doe@example.com',
        password: 'password123',
        gender: 'male',
        profilePic: 'https://avatar.iran.liara.run/public/boy?username=yu_cel',
        isOnline: false,
        lastSeen: new Date().toISOString(),
        notifications: 0,
        lastNotificationSeen: new Date().toISOString(),
    },
];

export const messages = [
    {
        chatId: 'chat1',
        senderId: users[0].id,
        text: 'Bonjour, comment ça va ?',
        read: false,
        imageUrls: [],
        replyTo: null,
        edited: false,
    },
    {
        chatId: 'chat1',
        senderId: users[1].id,
        text: 'Salut, ça va bien merci ! Et toi ?',
        read: false,
        imageUrls: [],
        replyTo: null,
        edited: false,
    },
];

export const groupes = [
    {
        id: 1,
        name: 'Teamate',
        members: [users[0], users[1], users[2], users[3], users[4]],
        lastMessage: messages[0],
        lastMessageDate: new Date().toISOString(),
        lastMessageSender: users[0],
        profilePic: Rocket,
        lastNotificationSeen: new Date().toISOString(),
        notifications: 0,
    },
    {
        id: 2,
        name: 'Transformers',
        members: [users[0], users[1], users[5]],
        lastMessage: messages[1],
        lastMessageDate: new Date().toISOString(),
        lastMessageSender: users[1],
        profilePic: Rocket,
        lastNotificationSeen: new Date().toISOString(),
        notifications: 4,
    },
    {
        id: 3,
        name: 'Teamate',
        members: [users[0], users[1], users[2], users[3], users[4]],
        lastMessage: messages[1],
        lastMessageDate: new Date().toISOString(),
        lastMessageSender: users[1],
        profilePic: Rocket,
        lastNotificationSeen: new Date().toISOString(),
        notifications: 0,
    },
    {
        id: 4,
        name: 'Transformers',
        members: [users[0], users[1], users[5]],
        lastMessage: messages[0],
        lastMessageDate: new Date().toISOString(),
        lastMessageSender: users[0],
        profilePic: Rocket,
        lastNotificationSeen: new Date().toISOString(),
        notifications: 4,
    },
    {
        id: 5,
        name: 'Transformers',
        members: [users[0], users[1], users[5]],
        lastMessage: messages[1],
        lastMessageDate: new Date().toISOString(),
        lastMessageSender: users[1],
        profilePic: Rocket,
        lastNotificationSeen: new Date().toISOString(),
        notifications: 4,
    },
]

export const MessageGroupe = [
    {
        chatId: 'groupe1',
        senderId: users[0].id,
        text: 'Bonjour, comment ça va ?',
        read: false,
        imageUrls: [],
        replyTo: null,
        edited: false,
    },
    {
        chatId: 'groupe1',
        senderId: users[1].id,
        text: 'Salut, ça va bien merci ! Et toi ?',
        read: false,
        imageUrls: [],
        replyTo: null,
        edited: false,
    },
    {
        chatId: 'groupe1',
        senderId: users[1].id,
        text: 'Salut, ça va bien merci ! Et toi ?',
        read: false,
        imageUrls: [],
        replyTo: null,
        edited: false,
    },
    {
        chatId: 'groupe1',
        senderId: users[3].id,
        text: 'Salut tout le monde !',
        read: false,
        imageUrls: [],
        replyTo: null,
        edited: false,
    },
]

