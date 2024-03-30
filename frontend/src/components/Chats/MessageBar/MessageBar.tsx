import { Box, FormControl, Stack, Typography, alpha, useMediaQuery } from "@mui/material";
import Picker from '@emoji-mart/react'
import customTheme from "../../../styles/customTheme";
import { AttachFile, Mood, Mic, Send, EditOutlined, Done, Close } from '@mui/icons-material';
import { StyledIconButton } from "../../IconButton/IconButton";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import useSendMessage from "../../../hooks/Chat/useSendMessage";
import { useChat } from "../../../contexts/ChatContext/useChatContext";
import { StyledTextField } from "./styleMessageBar";
import useEditMessage from "../../../hooks/Chat/useEditMessage";
import { AnimatePresence, motion } from 'framer-motion';
import { generateIconAnimation } from "../../Button/generateIconAnimation";



export default function ChatBar({ username }: { username: string }) {
    const [icon, setIcon] = useState({ icon: <Mic />, key: "mic", title: "Enregistrer" });
    const [secondaryIcon, setSecondaryIcon] = useState({ icon: <AttachFile />, key: "file", title: "Fichier" });
    const [openPicker, setOpenPicker] = useState(false);

    const isSmallScreen = useMediaQuery(customTheme.breakpoints.down('sm'));
    const { sendMessage } = useSendMessage();
    const { chatInfo, updateSendMessageStatus } = useChat();
    const { editMessage } = useEditMessage();
    const [messageText, setMessageText] = useState<string | null>(null);
    const chatInputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
    const typingTimeoutDuration = 3000; // 3 secondes
    const typingTimeoutId = useRef<NodeJS.Timeout | null>(null);

    const handleSendMessage = useCallback(async (event: React.FormEvent) => {
        event.preventDefault();

        if (!messageText || !messageText.trim()) return;

        const actionPromise = chatInfo.sendMessageStatus.editId
            ? editMessage(chatInfo.sendMessageStatus.editId, messageText)
            : sendMessage(chatInfo.chatId!, messageText);

        actionPromise.finally(() => {
            updateSendMessageStatus(prevState => ({ ...prevState, isTyping: false, isEditing: false, editId: null, messageToEdit: null }));
            setMessageText('');
        });
    }, [chatInfo.chatId, chatInfo.sendMessageStatus, editMessage, messageText, sendMessage, updateSendMessageStatus]);

    useEffect(() => {
        if (chatInfo.chatId == null) {
            setMessageText('');
            updateSendMessageStatus(prevState => ({ ...prevState, isTyping: false, isEditing: false, editId: null, messageToEdit: null }));
        }
    }, [chatInfo.chatId, updateSendMessageStatus]);

    useEffect(() => {
        if (chatInfo.sendMessageStatus.isEditing) {
            setMessageText(chatInfo.sendMessageStatus.messageToEdit);
            chatInputRef.current?.focus();
        }
        console.log(chatInfo.sendMessageStatus.isEditing);
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



    const handleTextChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setMessageText(e.target.value);
        updateSendMessageStatus(prevState => ({
            ...prevState,
            isTyping: true,
        }));
        if (typingTimeoutId.current) {
            clearTimeout(typingTimeoutId.current); // Annule le timeout précédent
        }
        typingTimeoutId.current = setTimeout(() => {

            updateSendMessageStatus(prevState => ({
                ...prevState,
                isTyping: false,
            }));
        }, typingTimeoutDuration);
    }, [updateSendMessageStatus]);

    useEffect(() => {
        // Nettoyage du timeout lors du démontage du composant
        return () => {
            if (typingTimeoutId.current) {
                clearTimeout(typingTimeoutId.current);
            }
        };
    }, []); // Les crochets vides indiquent que cet effet ne s'exécute que lors du montage et du démontage

    const spinTransition = {
        loop: Infinity,
        duration: 1, // Durée de la rotation en secondes
        ease: "easeInOut" // Type d'animation
    };


    return (
        <>
            <Stack direction={'column'} padding={{ xs: customTheme.spacing(0, 1), md: customTheme.spacing(0) }}>
                {openPicker &&
                    <Box flexGrow={1}>
                        <Picker emojiSize={32} set={'apple'} perLine={isSmallScreen ? 6 : 10} locale={'fr'} onClickOutside={() => { setOpenPicker(!openPicker); }} />
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
                        onChange={handleTextChange}
                        type="text"
                        color="primary"
                        placeholder={`Ecrivez un message à ${username}`}
                        hiddenLabel
                        multiline
                        maxRows={3}
                        helperText={chatInfo.sendMessageStatus.warning}
                        error={chatInfo.sendMessageStatus.error !== null}
                        InputProps={{

                            startAdornment: (
                                <motion.div
                                    whileHover={{ rotate: 360 }} // Rotation de 360 degrés au clic
                                    transition={spinTransition} // Utilisation de l'animation de rotation définie
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
                                    <StyledIconButton type="submit" title={secondaryIcon.title} onClick={() => {
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