import { useEffect } from "react";
import { useChat } from "../../contexts/ChatContext/useChatContext";
import { useSocket } from "../../contexts/Socket/useSocketContext";
import { Chat } from "../../types/Chat.type/Chat.Props";

const useListenDeleteChat = () => {
    const { updateDeleteChat, chatInfo, updateUserChats, updateChatId } = useChat();
    const { socket } = useSocket();

    useEffect(() => {
        if (socket) {
            socket.on('deleteChat', (chat: Chat) => {
                updateDeleteChat(prevState => ({ ...prevState, chat: chat }));
                updateUserChats(prevState => ({
                    ...prevState,
                    chats: prevState.chats.filter(chatItem => chatItem._id !== chat._id),
                    secondUsers: prevState.secondUsers?.filter(user =>
                        chat.members.some(member => member._id === user._id) && user._id !== chatInfo.userChats.currentUser?._id)
                }));
                if (chatInfo.chatId === chat._id) {
                    updateChatId(null);
                }
            });

            return () => {
                socket.off('deleteChat');
            };
        }
    }, [socket, updateDeleteChat, chatInfo.userChats.chats, chatInfo.userChats.secondUsers, chatInfo.userChats.currentUser?._id, updateUserChats, updateChatId, chatInfo.chatId]);
}

export default useListenDeleteChat;