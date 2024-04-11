import { useEffect } from "react";
import { useSocket } from "../../contexts/Socket/useSocketContext";
import { useChat } from "../../contexts/ChatContext/useChatContext";
import useAuth from "../../contexts/AuthContext/useAuthContext";

const useListenMarkAllMessagesAsRead = () => {
    const { socket } = useSocket();
    const { chatInfo, updateMessageInList } = useChat();
    const { currentUser } = useAuth();

    useEffect(() => {
        if (socket && chatInfo.chatId) {
            const handler = ({ chatId, messageIds }: { chatId: string, messageIds: string[] }) => {
                if (chatId === chatInfo.chatId) {
                    const messageIdsRead = new Set(messageIds);
                    updateMessageInList(prevMessagesList => prevMessagesList.map(message => {
                        return messageIdsRead.has(message._id) ? { ...message, read: true } : message;
                    }));
                }
            };
            socket.on('messagesAsRead', handler);

            return () => {
                socket.off('messagesAsRead', handler);
            };
        }
    }, [chatInfo.chatId, currentUser.data?._id, socket, updateMessageInList]);
};

export default useListenMarkAllMessagesAsRead;