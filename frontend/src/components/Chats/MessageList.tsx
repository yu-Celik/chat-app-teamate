import { Skeleton, Stack, Typography } from "@mui/material";
import customTheme from "../../styles/customTheme";
import MessageSend from "./MessageSend/MessageSend";
import useGetMessages from "../../hooks/Chat/useGetMessages";
import { useEffect } from "react";
import { useChat } from "../../contexts/ChatContext/useChatContext";
import useAuth from "../../contexts/AuthContext/useAuthContext";
import { Message } from "../../types/Chat.type/Chat.Props";


export default function ChatList() {
    const { chatInfo } = useChat();
    const { getMessages } = useGetMessages();
    const { currentUser } = useAuth();

    useEffect(() => {
        if (chatInfo?.chatId) {
            getMessages(chatInfo?.chatId)
        }
    }, [chatInfo?.chatId, getMessages])

    const currentChat = chatInfo.userChats.chats?.find(chat => chat._id === chatInfo.chatId);
    // console.log(currentChat?.members[1]._id);
    // console.log(currentUser.data?._id);

    return (
        <>
            {chatInfo.messages.messagesList.length < 1 ? (
                <Stack flexGrow={1} alignItems={'center'} justifyContent={'center'}>
                    <Typography variant="h6" sx={{ color: customTheme.palette.slate[300] }}>
                        Aucun message dans ce chat
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
                        {((chatInfo.sendMessageStatus.isTyping === true || chatInfo.sendMessageStatus.isLoading === true) && chatInfo.sendMessageStatus.isEditing === false) && (
                            <Stack marginTop={1} alignItems={currentUser.data?._id !== currentChat?.members[1]._id ? 'flex-end' : 'flex-start'}>
                                <Skeleton variant="rectangular" width={'40%'} height={'3rem'} />
                            </Stack>
                        )}
                        {chatInfo.messages.isLoading ? (
                            <Skeleton variant="rectangular" width={'100%'} height={'3rem'} />
                        ) : (
                            <>
                                {chatInfo.messages.messagesList.map((message: Message) => (
                                    <MessageSend
                                        key={message._id}
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
                                        isTyping={chatInfo.sendMessageStatus.isTyping}
                                        chatInfo={chatInfo}
                                    />
                                ))}
                            </>
                        )}
                    </>
                </Stack>)}
        </>
    )
}

