import { Stack } from "@mui/material";
import ChatBar from "./MessageBar/MessageBar";
import MessageList from "./MessageList";
import { heightHeader } from "./ChatDrawer/stylesDrawers";
import { useChat } from "../../contexts/ChatContext/useChatContext";
import useAuth from "../../contexts/AuthContext/useAuthContext";
import { User } from "../../types/Auth.type/Auth.Props";
import { useEffect, useState } from "react";

const heightHeaderChat = 71


export default function ChatBody() {
    const { chatInfo } = useChat();
    const { currentUser } = useAuth();
    const [receiverUser, setReceiverUser] = useState<User | null>(null);
    
    const selectedChat = chatInfo.userChats.chats?.find(chat => chat._id === chatInfo.chatId);
    useEffect(() => {
        setReceiverUser(selectedChat?.members.find(member => member._id !== currentUser.data?._id) || null);
    }, [selectedChat, currentUser.data?._id]);
    
    return (
        <Stack flexGrow={1} height={`calc(100vh - ${heightHeader}px - ${heightHeaderChat}px)`} direction={'column'} justifyContent={'flex-end'}>
            <MessageList />
            <ChatBar selectedChat={selectedChat || null} username={receiverUser?.username || ''} chatInfo={chatInfo} receiverUser={receiverUser}/>
        </Stack>
    )
}

