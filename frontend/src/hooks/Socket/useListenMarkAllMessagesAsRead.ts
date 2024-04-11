import { useEffect } from "react";
import { useSocket } from "../../contexts/Socket/useSocketContext";
import { Message } from "../../types/Chat.type/Chat.Props";
import { useChat } from "../../contexts/ChatContext/useChatContext";

const useListenMarkAllMessagesAsRead = () => {
    const { socket } = useSocket();
    const { chatInfo, updateMessageInList } = useChat();

    useEffect(() => {
        // Vérification supplémentaire pour s'assurer que chatId est présent
        if (socket && chatInfo.chatId) {
            console.log('useListenMarkAllMessagesAsRead');
            
            const handler = (messages: Message[]) => {
                // Mettre à jour l'état des messages en les marquant comme lus
                updateMessageInList(prevMessagesList => prevMessagesList.map(message => {
                    const foundMessage = messages.find(m => m._id === message._id);
                    return foundMessage ? { ...message, read: true } : message;
                }));
            };

            socket.on('messagesAsRead', handler);

            // Nettoyage de l'effet
            return () => {
                socket.off('messagesAsRead', handler);
            };
        }
    }, [socket, chatInfo.chatId, updateMessageInList]);
};

export default useListenMarkAllMessagesAsRead;