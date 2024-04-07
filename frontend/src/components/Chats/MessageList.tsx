import { Collapse, Skeleton, Stack, Typography } from "@mui/material";
import customTheme from "../../styles/customTheme";
import MessageSend from "./MessageSend/MessageSend";
import useGetMessages from "../../hooks/Chat/useGetMessages";
import { useEffect } from "react";
import { Message } from "../../types/Chat.type/Chat.Props";
import { TransitionGroup } from 'react-transition-group';
import { ChatInfo } from "../../types/Chat.type/ChatContext.Props";

export default function ChatList({ chatInfo, currentUserId }: { chatInfo: ChatInfo, currentUserId: string | null }) {
    const { getMessages } = useGetMessages();

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

                <Stack direction={'column-reverse'} p={{ xs: 0.5, sm: 2, md: 3 }} flexGrow={1} sx={{ // maxHeight={'calc(100dvh - 150px)'}
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
                        {((chatInfo.typingState.isTyping && chatInfo.typingState.userId !== currentUserId) && chatInfo.sendMessageStatus.isEditing === false) && (
                            <Stack marginTop={1} marginBottom={{xs: 1, sm: 0}} alignItems={'flex-start'}>
                                <Skeleton variant="rectangular" width={'40%'} height={'3rem'} sx={{ 
                                    borderRadius: '0px 10px 10px 10px', 
                                    marginLeft: '10px'

                                    }}/>
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

