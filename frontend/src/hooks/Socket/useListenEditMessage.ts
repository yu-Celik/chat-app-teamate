import { useEffect } from "react";
import { useChat } from "../../contexts/ChatContext/useChatContext";
import { useSocket } from "../../contexts/Socket/useSocketContext";

const useListenEditMessage = () => {
    const { updateMessageInList, updateLastMessageSeen, updateSendMessageStatus, chatInfo } = useChat();
    const { socket } = useSocket();

    useEffect(() => {
        if (socket) {
            socket.on('editMessage', (editedMessage) => {
                // Met à jour le message dans la liste des messages de la conversation actuelle
                if (chatInfo.chatId === editedMessage.chatId) {
                    updateMessageInList(prevMessagesList => prevMessagesList.map(message =>
                        message._id === editedMessage._id ? { ...message, ...editedMessage } : message
                    ));
                }

                // Met à jour le dernier message vu avec le message édité
                updateLastMessageSeen(prevState => ({
                    ...prevState,
                    messages: prevState.messages.map(message =>
                        message._id === editedMessage._id ? { ...message, ...editedMessage } : message
                    )
                }));

                updateSendMessageStatus(prevState => ({ ...prevState, firstMessageSend: true }));
            });

            return () => {
                socket.off('editMessage');
            };
        }
    }, [socket, updateMessageInList, updateLastMessageSeen, updateSendMessageStatus, chatInfo.chatId]);
}

export default useListenEditMessage;