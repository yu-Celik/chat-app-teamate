import ChatHeader from "../components/Chats/ChatHeader";
import { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Box, Paper, Stack, Typography, alpha, useMediaQuery } from "@mui/material";
import customTheme from "../styles/customTheme";
import PersistentDesktopDrawer from "../components/Chats/ChatDrawer/PersistentDesktopDrawer";
import { SwipeableMobileDrawer } from "../components/Chats/ChatDrawer/SwipeableMobileDrawer";
import useGetAllUsers from "../hooks/Chat/useGetAllUsers";
import useUserChats from "../hooks/Chat/useUserChats";
import useGetLastMessageSeen from "../hooks/Chat/useGetLastMessageSeen";
import useListenMessages from "../hooks/Socket/useListenMessages";
import useListenEditMessage from "../hooks/Socket/useListenEditMessage";
import useListenDeleteMessage from "../hooks/Socket/useListenDeleteMessage";
import useListenTyping from "../hooks/Socket/useListenTyping";
import useListenNewChat from "../hooks/Socket/useListenNewChat";
import useListenDeleteChat from "../hooks/Socket/useListenDeleteChat";
import MessageList from "../components/Chats/MessageList";
import MessageBar from "../components/Chats/MessageBar/MessageBar";
import { useChat } from "../contexts/ChatContext/useChatContext";
import useAuth from "../contexts/AuthContext/useAuthContext";
import { User } from "../types/Auth.type/Auth.Props";
import useSendMessage from "../hooks/Chat/useSendMessage";
import useEditMessage from "../hooks/Chat/useEditMessage";
import { debounce } from 'lodash';
import { useSocket } from "../contexts/Socket/useSocketContext";
import { AttachFile, Mic, Send, Done, Close } from '@mui/icons-material';
import { drawerWidth, heightHeader } from "../components/Chats/ChatDrawer/stylesDrawers";

export default function ChatPage() {
    useGetAllUsers();
    useUserChats();
    useGetLastMessageSeen();
    useListenMessages();
    useListenEditMessage();
    useListenDeleteMessage();
    useListenTyping();
    useListenNewChat();
    useListenDeleteChat();
    const { socket } = useSocket();
    const { sendMessage } = useSendMessage();
    const { editMessage } = useEditMessage();
    const [isTyping, setIsTyping] = useState(false);
    const [open, setOpen] = useState(false);
    const { chatInfo, updateSendMessageStatus } = useChat();
    const { currentUser } = useAuth();
    const [receiverUser, setReceiverUser] = useState<User | null>(null);
    const [messageText, setMessageText] = useState<string>('');
    const chatInputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
    const [icon, setIcon] = useState({ icon: <Mic />, key: "mic", title: "Enregistrer" });
    const [secondaryIcon, setSecondaryIcon] = useState({ icon: <AttachFile />, key: "file", title: "Fichier" });
    const emitTypingDebounced = useMemo(() => debounce(() => {
        if (chatInfo.chatId && socket) {
            socket.emit('typing', { receiverId: receiverUser?._id, chatId: chatInfo.chatId });
        }
    }, 500), [chatInfo.chatId, receiverUser?._id, socket]);
    const emitStopTypingDebounced = useMemo(() => debounce(() => {
        if (chatInfo.chatId && socket) {
            socket.emit('stopTyping', { receiverId: receiverUser?._id, chatId: chatInfo.chatId });
            setIsTyping(false);
        }
    }, 1000), [chatInfo.chatId, receiverUser?._id, socket]);

    useEffect(() => {
        setReceiverUser(chatInfo.userChats.chats?.find(chat => chat._id === chatInfo.chatId)?.members.find(member => member._id !== currentUser.data?._id) || null);
    }, [chatInfo.chatId, chatInfo.userChats.chats, currentUser.data?._id]);

    useEffect(() => {
        if (chatInfo.chatId == null) {
            setMessageText('');
            updateSendMessageStatus(prevState => ({ ...prevState, isEditing: false, editId: null, messageToEdit: null }));
        }
    }, [chatInfo.chatId, updateSendMessageStatus]);

    useEffect(() => {
        if (chatInfo.sendMessageStatus.isEditing) {
            setMessageText(chatInfo.sendMessageStatus.messageToEdit ?? '');
            chatInputRef.current?.focus();
        }
    }, [chatInfo.sendMessageStatus.isEditing, chatInfo.sendMessageStatus.messageToEdit, chatInputRef]);

    useEffect(() => {
        // Nettoyage: Annulez les debounces lors du démontage du composant
        return () => {
            emitTypingDebounced.cancel();
            emitStopTypingDebounced.cancel();
        };
    }, [emitStopTypingDebounced, emitTypingDebounced]);

    const handleCloseEdit = useCallback(() => {
        if (chatInfo.sendMessageStatus.isEditing) {
            updateSendMessageStatus(prevState => ({ ...prevState, isEditing: false, editId: null, messageToEdit: null }));
        }
    }, [chatInfo.sendMessageStatus.isEditing, updateSendMessageStatus]);

    useEffect(() => {
        if (chatInfo.sendMessageStatus.isEditing) {
            setIcon({ icon: <Done />, key: "done", title: "Validé" });
            setSecondaryIcon({ icon: <Close />, key: "close", title: "Fermer" });
        } else if (messageText && messageText.trim().length > 0) {
            setIcon({ icon: <Send />, key: "send", title: "Envoi" });
            setSecondaryIcon({ icon: <AttachFile />, key: "file", title: "Fichier" });
        } else {
            setIcon({ icon: <Mic />, key: "mic", title: "Enregistrer" });
            setSecondaryIcon({ icon: <AttachFile />, key: "file", title: "Fichier" });
        }
    }, [chatInfo.sendMessageStatus.isEditing, messageText]);



    const handleTextChange = useCallback((e: ChangeEvent<HTMLInputElement> | { native: string }) => {
        if ('target' in e) {
            setMessageText(e.target.value);
        } else if ('native' in e) {
            setMessageText((prevMessage) => (prevMessage ? prevMessage : '') + e.native);
        }
        if (socket) {
            if (!isTyping) {
                socket.emit('typing', { receiverId: receiverUser?._id, chatId: chatInfo.chatId });
                setIsTyping(true);
            }
        }

        // Redémarrez le debounce chaque fois que l'utilisateur tape
        emitStopTypingDebounced();

        // Réinitialisez et démarrez le debounce pour "stop typing" à chaque frappe
        emitStopTypingDebounced.cancel(); // Annulez le debounce précédent pour s'assurer qu'il s'exécute après la dernière frappe
        emitStopTypingDebounced(); // Démarrez un nouveau debounce pour "stop typing"
    }, [chatInfo.chatId, emitStopTypingDebounced, isTyping, receiverUser?._id, socket]);

    const handleSendMessage = useCallback(async (event: React.FormEvent) => {
        event.preventDefault();

        if (!messageText || !messageText.trim()) return;

        const actionPromise = chatInfo.sendMessageStatus.editId
            ? editMessage(chatInfo.sendMessageStatus.editId, messageText)
            : sendMessage(chatInfo.chatId!, messageText);

        actionPromise.finally(() => {
            updateSendMessageStatus(prevState => ({ ...prevState, isEditing: false, editId: null, messageToEdit: null }));
            if (chatInfo.chatId && socket) {
                socket.emit('stopTyping', { receiverId: receiverUser?._id, chatId: chatInfo.chatId });
            }
            setMessageText('');
        });
    }, [chatInfo.chatId, chatInfo.sendMessageStatus.editId, editMessage, messageText, receiverUser?._id, sendMessage, socket, updateSendMessageStatus]);





    const toggleDrawer = useCallback(() => {
        setOpen((prevOpen) => !prevOpen);
    }, []);
    // const isSmUp = useMediaQuery(customTheme.breakpoints.up('sm'));
    const isMdUp = useMediaQuery(customTheme.breakpoints.up('md'));
    const isMdDown = useMediaQuery(customTheme.breakpoints.down('md'));

    return (
        <>
            {isMdUp &&
                <PersistentDesktopDrawer>
                    <Box component="div" sx={{
                        position: 'relative',
                        border: 'none',
                        flexShrink: 0,
                        flexGrow: 1,
                        '&::-webkit-scrollbar': {
                            display: 'none',
                        }
                    }}>
                        <Paper component="div" sx={{
                            position: 'fixed',
                            top: 0,
                            right: 0,
                            left: `calc(${drawerWidth}px)`,
                            width: `calc(100% - ${drawerWidth}px)`,
                            boxSizing: 'border-box',
                            height: `calc(100% - ${heightHeader}px)`,
                            marginTop: `${heightHeader}px`,
                            backgroundColor: alpha(customTheme.palette.slate[800], 0.2),
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            border: 'none',
                            flexGrow: 1,
                        }} >
                            <ChatHeader />
                            <MessageList chatInfo={chatInfo} currentUserId={currentUser.data?._id ?? null} />
                            <MessageBar
                                messageText={messageText}
                                nameTextField={`message de ${receiverUser?.username}`}
                                placeholderTextField={`Écrivez un message à ${receiverUser?.username}`}
                                helperText={chatInfo.sendMessageStatus.warning}
                                errorTextField={chatInfo.sendMessageStatus.error !== null}
                                handleSendMessage={handleSendMessage}
                                handleTextChange={handleTextChange}
                                idTextField={'chatInput'}
                                variantTextField={'filled'}
                                ariaLabelTextField="Saisissez votre message ici"
                                ariaDescribedbyTextField={`ChatInput-helper-text-${receiverUser?.username}`}
                                ariaInvalidTextField={chatInfo.sendMessageStatus.error ? true : false}
                                chatInputRef={chatInputRef}
                                typeTextField={'text'}
                                colorTextField={'primary'}
                                hiddenLabelTextField={true}
                                multilineTextField={true}
                                icon={icon}
                                secondaryIcon={secondaryIcon}
                                messageToEdit={chatInfo.sendMessageStatus.messageToEdit}
                                messageIsEditing={chatInfo.sendMessageStatus.isEditing}
                                handleCloseEdit={handleCloseEdit}
                            />
                        </Paper>
                    </Box>
                </PersistentDesktopDrawer >
            }
            {
                isMdDown &&
                <>
                    <SwipeableMobileDrawer anchor="left" open={open} onClose={toggleDrawer} onOpen={toggleDrawer}>
                        <Box id="3" component="div" sx={{
                            position: 'relative',
                            border: 'none',
                            flexShrink: 0,
                            flexGrow: 1,
                            '&::-webkit-scrollbar': {
                                display: 'none',
                            }
                        }}>
                            <Paper component="div" sx={{
                                position: 'fixed',
                                top: 0,
                                right: 0,
                                left: 0,
                                width: '100%',
                                boxSizing: 'border-box',
                                height: `calc(100% - ${heightHeader}px)`,
                                marginTop: `${heightHeader}px`,
                                backgroundColor: alpha(customTheme.palette.slate[800], 0.2),
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-start',
                                border: 'none',
                                flexGrow: 1,
                            }} >
                                <ChatHeader onClickOpenDrawer={toggleDrawer} />
                                {chatInfo?.chatId != null ? (
                                    <>
                                        <MessageList chatInfo={chatInfo} currentUserId={currentUser.data?._id ?? null} />
                                        <MessageBar
                                            messageText={messageText}
                                            nameTextField={`message de ${receiverUser?.username}`}
                                            placeholderTextField={`Écrivez un message à ${receiverUser?.username}`}
                                            helperText={chatInfo.sendMessageStatus.warning}
                                            errorTextField={chatInfo.sendMessageStatus.error !== null}
                                            handleSendMessage={handleSendMessage}
                                            handleTextChange={handleTextChange}
                                            idTextField={'chatInput'}
                                            variantTextField={'filled'}
                                            ariaLabelTextField="Saisissez votre message ici"
                                            ariaDescribedbyTextField={`ChatInput-helper-text-${receiverUser?.username}`}
                                            ariaInvalidTextField={chatInfo.sendMessageStatus.error ? true : false}
                                            chatInputRef={chatInputRef}
                                            typeTextField={'text'}
                                            colorTextField={'primary'}
                                            hiddenLabelTextField={true}
                                            multilineTextField={true}
                                            icon={icon}
                                            secondaryIcon={secondaryIcon}
                                            messageToEdit={chatInfo.sendMessageStatus.messageToEdit}
                                            messageIsEditing={chatInfo.sendMessageStatus.isEditing}
                                            handleCloseEdit={handleCloseEdit}
                                        />
                                    </>
                                ) : (
                                    <Stack flexGrow={1} alignItems={'center'} justifyContent={'center'} height={'100%'}>
                                        <Typography variant="h6" sx={{ color: customTheme.palette.slate[300] }}>
                                            Aucun chat selectionner
                                        </Typography>
                                    </Stack>
                                )}


                            </Paper>
                        </Box>
                    </SwipeableMobileDrawer>
                </>
            }
        </>
    )
}

