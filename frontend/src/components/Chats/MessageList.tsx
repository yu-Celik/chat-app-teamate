import { Stack, Typography } from "@mui/material";
import customTheme from "../../styles/customTheme";
import MessageSend from "./MessageSend/MessageSend";
import useGetMessages from "../../hooks/Chat/useGetMessages";
import { useEffect } from "react";
import { useChat } from "../../contexts/ChatContext/useChatContext";
import { Message } from "../../types/Chat.type/Chat.Props";


export default function ChatList() {
    const { chatInfo } = useChat();
    const { getMessages } = useGetMessages();

    useEffect(() => {
        if (chatInfo?.chatId) {
            getMessages(chatInfo?.chatId)
        }
    }, [chatInfo?.chatId, getMessages])

    console.log(chatInfo.messages.messagesList.length);
    
    return (
        <>
            { chatInfo.messages.messagesList.length < 1 ? (
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
                    {chatInfo.messages.messagesList.map((message: Message) => (
                        <MessageSend

                            key={message?._id}
                            _id={message?._id}
                            chatId={message?.chatId}
                            senderId={message?.senderId}
                            receiverId={message?.receiverId}
                            replyTo={message?.replyTo}
                            message={message?.message}
                            messageType={message?.messageType}
                            read={message?.read}
                            edited={message?.edited}
                            imageUrls={message?.imageUrls}
                            createdAt={message?.createdAt}
                            updatedAt={message?.updatedAt}
                            isLoading={chatInfo.messages.isLoading}

                        />
                    ))}
                </Stack>)}
        </>
    )
}

