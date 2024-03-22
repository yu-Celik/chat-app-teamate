import { User } from "../Auth.Context.type/Auth.Context.Props";

export type ChatContextProps = {
    userChats: Chat[];
    fetchingUsers: User[];
    isFetchingUsersLoading: boolean;
    isFindingUserChatsLoading: boolean;
}

export type Message = {
    _id: string;
    content: string;
    user: User;
    createdAt: string;
}

export type Chat = {
    _id: string;
    members: string[];
    messages: Message[];
}


