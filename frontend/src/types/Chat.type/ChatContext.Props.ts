import { User } from "../Auth.type/Auth.Props";
import { ChatState, MessagesState, UserChats, AllUsers } from "./Chat.Props";

export type ChatContextProps = {
    chatInfo: ChatInfo;
    updateAllUsers: UpdateAllUsers;
    updateUserChats: UpdateUserChats;
    updateCreateChat: UpdateCreateChat;
    updateDeleteChat: UpdateDeleteChat;
    updatePotentialChats: UpdatePotentialChats;
    updateMessages: UpdateMessages;
    updateChatId: UpdateChatId;

};

export type ChatInfo = {
    chatId: string | null;
    chatName: string | null;
    lastLogin: string | null;
    profilePic: string | null;
    createChat: ChatState;
    deleteChat: ChatState;
    userChats: UserChats;
    allUsers: AllUsers;
    potentialChats: User[];
    messages: MessagesState
};

export type UpdateAllUsers = (allUsers: AllUsers) => void;
export type UpdateUserChats = (userChats: UserChats) => void;
export type UpdateCreateChat = (createChat: ChatState) => void;
export type UpdateDeleteChat = (deleteChat: ChatState) => void;
export type UpdatePotentialChats = (potentialChats: User[]) => void;
export type UpdateMessages = (messages: MessagesState) => void;
export type UpdateChatId = (chatId: string) => void;

