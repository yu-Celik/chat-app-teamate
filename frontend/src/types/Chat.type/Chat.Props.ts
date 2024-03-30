import { User } from "../Auth.type/Auth.Props";

export type Message = {
    _id: string,
    chatId: string,
    senderId: string,
    receiverId: string,
    replyTo: null,
    message: string,
    messageType: "text" | "image" | "video" | "mixed",
    read: boolean,
    edited: boolean,
    imageUrls: [],
    createdAt: string,
    updatedAt: string,
}

export type Chat = {
    _id: string;
    members: User[];
    createdAt: string;
    updatedAt: string;
    order: number;
}

export type ChatState = {
    isLoading?: boolean;
    error?: string | null;
    chat?: Chat | null;
}

export type ChatsState = {
    isLoading: boolean;
    chats: Chat[];
    error: string | null;
}


export type UserChats = {
    isLoading: boolean;
    error: string | null;
    chats: Chat[];
    currentUser?: User;
    secondUsers?: User[];
}

export type MessagesState = {
    isLoading: boolean;
    messagesList: Message[];
    error: string | null;
}


export type AllUsers = {
    isLoading?: boolean;
    error?: string | null;
    users?: User[];
}

export type MessageState = {
    isLoading: boolean;
    error: string | null;
    warning: string | null;
    isTyping: boolean;
    isEditing: boolean;
    editId: string | null;
    messageToEdit: string | null;
}

export type DeleteMessage = {
    isLoading: boolean;
    error: string | null;
    message: string | null;
}

export type UpdateMessagesParams = Partial<MessagesState>;




