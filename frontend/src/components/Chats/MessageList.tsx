import { Collapse, Skeleton, Stack, Typography } from "@mui/material";
import customTheme from "../../styles/customTheme";
import MessageSend from "./MessageSend/MessageSend";
import useGetMessages from "../../hooks/Chat/useGetMessages";
import { useEffect } from "react";
import { useChat } from "../../contexts/ChatContext/useChatContext";
import useAuth from "../../contexts/AuthContext/useAuthContext";
import { Message } from "../../types/Chat.type/Chat.Props";
import { TransitionGroup } from 'react-transition-group';

export default function ChatList() {
    const { chatInfo } = useChat();
    const { getMessages } = useGetMessages();
    const { currentUser } = useAuth();

    useEffect(() => {
        if (chatInfo?.chatId) {
            getMessages(chatInfo?.chatId)
        }
    }, [chatInfo?.chatId, getMessages])


    return (
        <>
            {chatInfo.messages.messagesList.length < 1 ? (
                <Stack flexGrow={1} alignItems={'center'} justifyContent={'center'}>
                    <Typography variant="h6" sx={{ color: customTheme.palette.slate[300] }}>
                        {chatInfo.chatId ? 'Aucun message dans ce chat' : 'Aucun chat sélectionné'}
                    </Typography>
                </Stack>) : (

                <Stack direction={'column-reverse'} p={{ xs: 0.5, sm: 2, md: 3 }} flexGrow={1} sx={{ // maxHeight={'calc(100vh - 150px)'}
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    scrollBehavior: 'smooth',
                    '&::-webkit-scrollbar': {
                        width: '0.25rem',
                        height: '0.25rem',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: customTheme.palette.slate[500],
                        borderRadius: '10px',
                    },
                    '&::-webkit-scrollbar-track': {
                        backgroundColor: 'transparent',
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                        backgroundColor: customTheme.palette.slate[600],
                    },
                }}>
                    <>
                        {/* Affiche le skeleton si le chat n'est pas en cours d'édition et si isTyping ou isLoading sont true */}
                        {((chatInfo.typingState.isTyping && chatInfo.typingState.userId !== currentUser.data?._id) && chatInfo.sendMessageStatus.isEditing === false) && (
                            <Stack marginTop={1} alignItems={'flex-start'}>
                                <Skeleton variant="rectangular" width={'40%'} height={'3rem'} />
                            </Stack>
                        )}
                        {chatInfo.messages.isLoading ? (
                            <Skeleton variant="rectangular" width={'100%'} height={'3rem'} />
                        ) : (
                            <>
                                <TransitionGroup>
                                    {chatInfo.messages.messagesList.map((message: Message) => (
                                        <Collapse key={message._id}>
                                            <MessageSend
                                                _id={message._id}
                                                chatId={message.chatId}
                                                senderId={message.senderId}
                                                receiverId={message.receiverId}
                                                replyTo={message.replyTo}
                                                message={message.message}
                                                messageType={message.messageType}
                                                read={message.read}
                                                edited={message.edited}
                                                imageUrls={message.imageUrls}
                                                createdAt={message.createdAt}
                                                updatedAt={message.updatedAt}
                                                isLoading={chatInfo.messages.isLoading}
                                                chatInfo={chatInfo}
                                            />
                                        </Collapse>
                                    )).reverse()}
                                </TransitionGroup>
                            </>
                        )}
                    </>
                </Stack>)}
        </>
    )
}

