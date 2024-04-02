import { useEffect } from "react";
import { useChat } from "../../contexts/ChatContext/useChatContext";
import { useSocket } from "../../contexts/Socket/useSocketContext";

const useListenEditMessage = () => {
    const { updateMessageInList, updateLastMessageSeen, updateSendMessageStatus } = useChat();
    const { socket } = useSocket();

    useEffect(() => {
        if (socket) {
            socket.on('editMessage', (editedMessage) => {
                updateMessageInList(prevMessagesList => prevMessagesList.map(message =>
                    message._id === editedMessage._id ? { ...message, ...editedMessage } : message
                ));
                updateLastMessageSeen(prevState => {
                    if (prevState.messages.some(message => message._id === editedMessage._id)) {
                        return {
                            ...prevState,
                            messages: prevState.messages.map(message =>
                                message._id === editedMessage._id ? { ...message, ...editedMessage } : message
                            )
                        };
                    }
                    return prevState;
                });
                updateSendMessageStatus(prevState => ({ ...prevState, firstMessageSend: true }));

            });

            return () => {
                socket.off('editMessage');
            };
        }
    }, [socket, updateMessageInList, updateLastMessageSeen, updateSendMessageStatus]);
}

export default useListenEditMessage;