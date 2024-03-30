import { User } from "../Auth.type/Auth.Props";
import { ChatState, MessagesState, UserChats, AllUsers, MessageState, Message, DeleteMessage, Chat } from "./Chat.Props";

export type ChatContextProps = {
    chatInfo: ChatInfo;
    updateAllUsers: UpdateAllUsers;
    updateUserChats: UpdateUserChats;
    updateCreateChat: UpdateCreateChat;
    updateDeleteChat: UpdateDeleteChat;
    updatePotentialChats: UpdatePotentialChats;
    updateMessages: UpdateMessages;
    updateChatId: UpdateChatId;
    updateSendMessageStatus: UpdateSendMessageStatus
    updateMessageInList: UpdateMessageInList;
    deleteMessageFromList: DeleteMessageFromList;
    updateDeleteMessage: UpdateDeleteMessage
    updateChatOrder: UpdateChatOrder
};

export type ChatInfo = {
    chatId: string | null;
    createChat: ChatState;
    deleteChat: ChatState;
    userChats: UserChats;
    allUsers: AllUsers;
    potentialChats: User[];
    messages: MessagesState
    deleteMessage: DeleteMessage
    sendMessageStatus: MessageState
};
export type UpdateSendMessageStatus = (updateFunction: (prevState: MessageState) => MessageState) => void;
export type UpdateDeleteMessage = (updateFunction: (prevState: DeleteMessage) => DeleteMessage) => void;
export type UpdateAllUsers = (updateFunction: (prevState: AllUsers) => AllUsers) => void;
export type UpdateUserChats = (updateFunction: (prevState: UserChats) => UserChats) => void;
export type UpdateCreateChat = (updateFunction: (prevState: ChatState) => ChatState) => void;
export type UpdateDeleteChat = (updateFunction: (prevState: ChatState) => ChatState) => void;
export type UpdatePotentialChats = (updateFunction: (prevState: User[]) => User[]) => void;
export type UpdateMessages = (updateFunction: (prevState: MessagesState) => MessagesState) => void;
export type UpdateMessageInList = (updateFunction: (prevState: Message[]) => Message[]) => void;
export type UpdateChatId = (chatId: string | null) => void;
export type DeleteMessageFromList = (messageId: string) => void;
export type UpdateChatOrder = (newChatsArray: Chat[]) => void;

