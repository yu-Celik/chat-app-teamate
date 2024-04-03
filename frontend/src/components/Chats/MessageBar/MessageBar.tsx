import { Box, FormControl, Stack, Typography, alpha, useMediaQuery } from "@mui/material";
import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'
import customTheme from "../../../styles/customTheme";
import { AttachFile, Mood, Mic, Send, EditOutlined, Done, Close } from '@mui/icons-material';
import { StyledIconButton } from "../../IconButton/IconButton";
import { ChangeEvent, ChangeEventHandler, FormEvent, useCallback, useEffect, useRef, useState } from "react";
import useSendMessage from "../../../hooks/Chat/useSendMessage";
import { useChat } from "../../../contexts/ChatContext/useChatContext";
import { StyledTextField } from "./styleMessageBar";
import useEditMessage from "../../../hooks/Chat/useEditMessage";
import { motion } from 'framer-motion';
import { generateIconAnimation } from "../../Button/generateIconAnimation";
import { useSocket } from "../../../contexts/Socket/useSocketContext";
import { Chat } from "../../../types/Chat.type/Chat.Props";
import { User } from "../../../types/Auth.type/Auth.Props";
import { ChatInfo } from "../../../types/Chat.type/ChatContext.Props";



export default function ChatBar({ username, chatInfo, receiverUser }: { username: string, selectedChat: Chat | null, chatInfo: ChatInfo, receiverUser: User | null }) {
    const [icon, setIcon] = useState({ icon: <Mic />, key: "mic", title: "Enregistrer" });
    const [secondaryIcon, setSecondaryIcon] = useState({ icon: <AttachFile />, key: "file", title: "Fichier" });
    const [openPicker, setOpenPicker] = useState(false);
    const { socket } = useSocket();
    const isSmallScreen = useMediaQuery(customTheme.breakpoints.down('sm'));
    const { sendMessage } = useSendMessage();
    const { updateSendMessageStatus } = useChat();
    const { editMessage } = useEditMessage();
    const [messageText, setMessageText] = useState<string>('');
        const chatInputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
    const typingTimeoutDuration = 3000;
    const typingTimeoutId = useRef<NodeJS.Timeout | null>(null);

    const handleSendMessage = useCallback(async (event: React.FormEvent) => {
        event.preventDefault();

        if (!messageText || !messageText.trim()) return;

        const actionPromise = chatInfo.sendMessageStatus.editId
            ? editMessage(chatInfo.sendMessageStatus.editId, messageText)
            : sendMessage(chatInfo.chatId!, messageText);

        actionPromise.finally(() => {
            updateSendMessageStatus(prevState => ({ ...prevState, isEditing: false, editId: null, messageToEdit: null }));
                if (chatInfo.chatId && socket) {
                    socket.emit('stopTyping', { receiverId: receiverUser?._id });
                }
            setMessageText('');
        });
    }, [chatInfo.chatId, chatInfo.sendMessageStatus.editId, editMessage, messageText, receiverUser?._id, sendMessage, socket, updateSendMessageStatus]);

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

        if (chatInfo.chatId && socket) {
            socket.emit('typing', { receiverId: receiverUser?._id });
        }
    
        if (typingTimeoutId.current) {
            clearTimeout(typingTimeoutId.current);
        }
        typingTimeoutId.current = setTimeout(() => {
            if (chatInfo.chatId && socket) {
                socket.emit('stopTyping', { receiverId: receiverUser?._id });
            }

        }, typingTimeoutDuration);
    }, [chatInfo.chatId, receiverUser?._id, socket]);

    useEffect(() => {
        // Nettoyage du timeout lors du démontage du composant
        return () => {
            if (typingTimeoutId.current) {
                clearTimeout(typingTimeoutId.current);
            }
        };
    }, []);

    const spinTransition = {
        loop: Infinity,
        duration: 1,
        ease: "easeInOut"
    };



    return (
        <>
            <Stack direction={'column'} padding={{ xs: customTheme.spacing(0, 1), md: customTheme.spacing(0) }}>
                {openPicker &&
                    <Box zIndex={1000} flexGrow={1}>
                        <Picker data={data} emojiButtonColors={[
                            'rgba(155,223,888,.7)',
                            'rgba(149,211,254,.7)',
                            'rgba(247,233,34,.7)',
                            'rgba(238,166,252,.7)',
                            'rgba(255,213,143,.7)',
                            'rgba(211,209,255,.7)',]} onEmojiSelect={handleTextChange} emojiSize={24} perLine={isSmallScreen ? 6 : 10} onClickOutside={() => { setOpenPicker(!openPicker); }} />
                    </Box>
                }
                <FormControl component="form" onSubmit={handleSendMessage}>
                    <Stack direction={'row'} alignItems={'center'} sx={{
                        display: chatInfo.sendMessageStatus.isEditing ? 'flex' : 'none',
                        color: customTheme.palette.slate[200],
                        backgroundColor: alpha(customTheme.palette.slate[200], 0.1),
                        padding: customTheme.spacing(1, 1, 1, 6),
                        '&:hover': {
                            backgroundColor: alpha(customTheme.palette.slate[800], 0.2),
                        },
                    }}>
                        <Stack flexGrow={1} direction={'row'} alignItems={'center'} p={0.5} sx={{
                            backgroundColor: alpha(customTheme.palette.orangePV.dark, 0.2),
                            borderRadius: '0.5rem',
                        }}>
                            <Stack direction={'row'} alignItems={'center'} padding={1} marginRight={1}>
                                <EditOutlined />
                            </Stack>
                            <Stack direction={'column'}>
                                <Typography sx={{
                                    fontSize: customTheme.typography.subtitle2
                                }}>
                                    Modifiez votre message
                                </Typography>
                                <Typography sx={{
                                    fontSize: customTheme.typography.caption
                                }}>
                                    {chatInfo.sendMessageStatus.messageToEdit}
                                </Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                    <StyledTextField
                        id="chatInput"
                        variant="filled"
                        aria-label="Message"
                        aria-describedby="message-helper"
                        inputRef={chatInputRef}
                        value={messageText as string}
                        name={`message de ${username}`}
                        onChange={handleTextChange as unknown as ChangeEventHandler}
                        type="text"
                        color="primary"
                        placeholder={`Écrivez un message à ${username}`}
                        hiddenLabel
                        multiline
                        maxRows={3}
                        helperText={chatInfo.sendMessageStatus.warning}
                        error={chatInfo.sendMessageStatus.error !== null}
                        InputProps={{

                            startAdornment: (
                                <motion.div
                                    whileHover={{ rotate: 360 }}
                                    transition={spinTransition} 
                                >
                                    <StyledIconButton title="Emoji" onClick={() => {
                                        setTimeout(() => {
                                            setOpenPicker(!openPicker);
                                        }, 0);
                                    }}>
                                        <Mood />
                                    </StyledIconButton>
                                </motion.div>
                            ),
                            endAdornment: (
                                <Stack direction={"row"}>
                                    <StyledIconButton title={secondaryIcon.title} onClick={() => {
                                        if (chatInfo.sendMessageStatus.isEditing) {
                                            updateSendMessageStatus(prevState => ({ ...prevState, isEditing: false, editId: null, messageToEdit: null }));
                                        }
                                    }}>
                                        {generateIconAnimation(secondaryIcon.key, secondaryIcon.icon)}
                                    </StyledIconButton>
                                    <StyledIconButton type="submit" title={icon.title}>
                                        {generateIconAnimation(icon.key, icon.icon)}
                                    </StyledIconButton>
                                </Stack>
                            )
                        }}
                        onKeyDown={(ev) => {
                            if (ev.key === 'Enter') {
                                handleSendMessage(ev as unknown as FormEvent<HTMLFormElement>);
                                ev.preventDefault();
                            }
                        }}
                        autoComplete="off"

                    />
                </FormControl >
            </Stack >
        </>
    )
}