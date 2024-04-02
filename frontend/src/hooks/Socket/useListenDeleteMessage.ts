import { useEffect } from "react";
import { useChat } from "../../contexts/ChatContext/useChatContext";
import { useSocket } from "../../contexts/Socket/useSocketContext";

const useListenDeleteMessage = () => {
    const { deleteMessageFromList, updateDeleteMessage, updateLastMessageSeen, updateSendMessageStatus } = useChat();
    const { socket } = useSocket();

    useEffect(() => {
        if (socket) {
            socket.on('deleteMessage', (message) => {
                const messageId = message._id;
                deleteMessageFromList(messageId);
                updateDeleteMessage(prevState => ({
                    ...prevState,
                    message
                }));
                updateLastMessageSeen(prevState => ({
                    ...prevState,
                    messages: prevState.messages.filter(msg => msg._id !== messageId)
                }));
                updateSendMessageStatus(prevState => ({ ...prevState, firstMessageSend: true }));

            });

            return () => {
                socket.off('deleteMessage');
            };
        }
    }, [socket, deleteMessageFromList, updateDeleteMessage, updateLastMessageSeen, updateSendMessageStatus]); 
}

export default useListenDeleteMessage;