import { useEffect } from 'react';
import { useSocket } from '../../contexts/Socket/useSocketContext';
import { useChat } from '../../contexts/ChatContext/useChatContext';

const useListenConversationOpened = () => {
    const { socket } = useSocket();
    const { chatInfo } = useChat();

    useEffect(() => {
        if (!socket) return;
        const handleConversationOpened = (data: { from: string, chatId: string }) => {
            // Vérifiez ici si le chatId de l'événement correspond au chatId actuel
            const isMember = chatInfo.userChats.chats.some(chat => chat._id === data.chatId && chat.members.some(member => member._id === data.from));
            if (isMember) {
                console.log(`Conversation ${data.chatId} ouverte par ${data.from}`);
            }
        };

        socket.on('conversationOpened', handleConversationOpened);

        return () => {
            socket.off('conversationOpened', handleConversationOpened);
        };
    }, [socket, chatInfo.chatId, chatInfo.userChats.chats]); // Ajoutez chatInfo.chatId aux dépendances pour réagir aux changements de chatId
};

export default useListenConversationOpened;