import { User } from "../Auth.type/Auth.Props";

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
    members?: string[];
    messages?: Message[];
}



export type PotentialChat = {
    users: User[];
}

export type UserChats = {
    isLoading: boolean;
    chats: Chat[];
    currentUser: User;
    secondUsers: User[];
}

export type secondUsers = {
    members: User[];
}


export type UsersState = {
    isLoading: boolean;
    users: User[];
}

