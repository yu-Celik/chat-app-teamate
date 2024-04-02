import { useEffect } from "react";
import { useChat } from "../../contexts/ChatContext/useChatContext";
import { useSocket } from "../../contexts/Socket/useSocketContext";
import { User } from "../../types/Auth.type/Auth.Props";

const useListenNewChat = () => {
    const { updateCreateChat, chatInfo, updateUserChats, updateChatId } = useChat();
    const { socket } = useSocket();

    useEffect(() => {
        // Vérifiez si socket n'est pas null avant de s'abonner aux événements
        if (socket) {
            socket.on('newChat', (chat) => {
                updateCreateChat(prevState => ({ ...prevState, chat: chat }));
                const newUserChats = [...(chatInfo.userChats.chats || []), chat];
                const secondUsers = [...(chatInfo.userChats.secondUsers || []), chat.members.find((member: User) => member._id !== chatInfo.userChats.currentUser?._id)];
                updateUserChats(prevState => ({ ...prevState, chats: newUserChats, secondUsers: secondUsers }));

            });

            // Nettoyer l'écouteur d'événements lors du démontage du composant
            return () => {
                socket.off('newChat');
            };
        }
    }, [socket, updateCreateChat, chatInfo.userChats.chats, chatInfo.userChats.secondUsers, chatInfo.userChats.currentUser?._id, updateUserChats, updateChatId]);
}

export default useListenNewChat;

