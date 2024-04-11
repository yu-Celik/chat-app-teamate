import { useEffect } from "react";
import { useSocket } from "../../contexts/Socket/useSocketContext";
import { useChat } from "../../contexts/ChatContext/useChatContext";
import useAuth from "../../contexts/AuthContext/useAuthContext";

const useListenMessageRead = () => {
    const { socket } = useSocket();
    const { updateMessageInList, chatInfo } = useChat();
    const { currentUser } = useAuth();

    useEffect(() => {
        if (socket) {
            const handler = ({ senderId, receiverId, messageId, chatId }: { senderId: string, receiverId: string, messageId: string, chatId: string }) => {
                // Mettez à jour l'état/UI pour refléter que le message a été lu
                // if (chatId === chatInfo.chatId && (currentUser.data?._id === senderId || currentUser.data?._id === receiverId)) {
                    updateMessageInList(prevMessagesList => prevMessagesList.map(message =>
                        message._id === messageId ? { ...message, read: true, readAt: new Date() } : message
                    ));
                    console.log(`Le message ${messageId} du chat ${chatId} a été marqué comme lu par ${receiverId} pour ${senderId}`);
                }
            // };
            socket.on('messageRead', handler);

            return () => {
                socket.off('messageRead', handler);
            };
        }
    }, [chatInfo.chatId, currentUser.data?._id, socket, updateMessageInList]);
};

export default useListenMessageRead;