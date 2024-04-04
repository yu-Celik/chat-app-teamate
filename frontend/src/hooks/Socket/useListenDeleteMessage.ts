import { useEffect } from "react";
import { useChat } from "../../contexts/ChatContext/useChatContext";
import { useSocket } from "../../contexts/Socket/useSocketContext";

const useListenDeleteMessage = () => {
    const { deleteMessageFromList, updateDeleteMessage, updateLastMessageSeen, updateSendMessageStatus, chatInfo } = useChat();
    const { socket } = useSocket();

    useEffect(() => {
        if (socket) {
            socket.on('deleteMessage', (message) => {
                // Supprime le message de la liste des messages de la conversation actuelle
                if (chatInfo.chatId === message.chatId) {
                    deleteMessageFromList(message._id);
                }

                // Met à jour l'état pour refléter la suppression du message
                updateDeleteMessage(prevState => ({
                    ...prevState,
                    message
                }));

                // Met à jour le dernier message vu en supprimant le message supprimé
                updateLastMessageSeen(prevState => ({
                    ...prevState,
                    messages: prevState.messages.filter(msg => msg._id !== message._id)
                }));

                updateSendMessageStatus(prevState => ({ ...prevState, firstMessageSend: true }));
            });

            return () => {
                socket.off('deleteMessage');
            };
        }
    }, [socket, deleteMessageFromList, updateDeleteMessage, updateLastMessageSeen, updateSendMessageStatus, chatInfo.chatId]);
}

export default useListenDeleteMessage;