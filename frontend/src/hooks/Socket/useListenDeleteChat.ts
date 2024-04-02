import { useEffect } from "react";
import { useChat } from "../../contexts/ChatContext/useChatContext";
import { useSocket } from "../../contexts/Socket/useSocketContext";
import { User } from "../../types/Auth.type/Auth.Props";

const useListenDeleteChat = () => {
    const { updateDeleteChat, chatInfo, updateUserChats, updateChatId } = useChat();
    const { socket } = useSocket();

    useEffect(() => {

        if (socket) {
            socket.on('deleteChat', (chat) => {
                updateDeleteChat(prevState => ({ ...prevState, chat: chat }));
                updateUserChats(prevState => ({
                    ...prevState,
                    chats: prevState.chats?.filter(chatItem => chatItem._id !== chat._id),
                    secondUsers: prevState.secondUsers?.filter(user =>
                        Array.isArray(chat.members) &&
                        user._id !== chat.members.find((member: User) => member._id !== chatInfo.userChats.currentUser?._id)?._id)
                }));
                if (chatInfo.chatId === chat._id) {
                    updateChatId(null);
                }
            });

            // Nettoyer l'écouteur d'événements lors du démontage du composant
            return () => {
                socket.off('deleteChat');
            };
        }
    }, [socket, updateDeleteChat, chatInfo.userChats.chats, chatInfo.userChats.secondUsers, chatInfo.userChats.currentUser?._id, updateUserChats, updateChatId, chatInfo.chatId]);
}

export default useListenDeleteChat;

