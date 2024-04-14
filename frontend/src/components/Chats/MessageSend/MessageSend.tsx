import { PopoverPosition, Stack, Typography, alpha } from "@mui/material";
import customTheme from "../../../styles/customTheme";
import { Visibility } from '@mui/icons-material/';
import { Fragment } from "react/jsx-runtime";
import { useCallback, useState } from "react";
import { useClipboard } from "../../../hooks/useClipboeard";
import ContextMenu from "../ContextMenu/ContextMenu";
import { Message } from "../../../types/Chat.type/Chat.Props";
import useAuth from "../../../contexts/AuthContext/useAuthContext";
import { motion } from 'framer-motion';
import { ChatInfo } from "../../../types/Chat.type/ChatContext.Props";
import { useChat } from "../../../contexts/ChatContext/useChatContext";
import useDeleteMessage from "../../../hooks/Chat/useDeleteMessage";





export default function MessageSend({ _id, chatId, senderId, message, read, edited, createdAt, chatInfo }: Message & { isLoading: boolean, chatInfo: ChatInfo }) {

    const { currentUser } = useAuth();
    const { updateSendMessageStatus } = useChat();
    const { deleteMessage } = useDeleteMessage()
    // const imgAllowed = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/svg', 'image/webp'];
    // const isSmallScreen = useMediaQuery(customTheme.breakpoints.down('sm'));
    // const isMediumScreen = useMediaQuery(customTheme.breakpoints.down('md'));
    // const isLargeScreen = useMediaQuery(customTheme.breakpoints.down('lg'));

    const [menuPosition, setMenuPosition] = useState<{ top: number, left: number } | null>(null);

    const { copy } = useClipboard();

    const handleCopy = (text: string) => {
        copy(text);
    };

    const handleContextMenuOnMessage = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation(); // Empêche l'événement de se propager
        event.preventDefault(); // Empêche le menu contextuel par défaut du navigateur

        // Ferme d'abord tout menu ouvert
        if (menuPosition !== null) {
            setMenuPosition(null);
        } else {
            openMenuAtPosition(event);
        }
    };

    const openMenuAtPosition = (event: React.MouseEvent<HTMLDivElement>) => {
        const messageElement = event.currentTarget; // Obtient l'élément de message
        if (!messageElement) {
            console.error("Élément de message non trouvé.");
            return;
        }
        const rect = messageElement.getBoundingClientRect(); // Obtient la position et les dimensions de l'élément

        // Calcule la position du menu pour qu'il s'affiche à l'intérieur du message
        setMenuPosition({
            top: rect.top + window.scrollY, // Ajuste en fonction du défilement de la page
            left: rect.right + window.scrollX,
        });
    };

    const handleCloseMenu = () => {
        setMenuPosition(null);
    };


    const handleEditMessage = useCallback((_id: string) => {
        const messageToEdit = chatInfo?.messages.messagesList?.find(msg => msg?._id === _id);
        console.log(messageToEdit);

        if (messageToEdit !== undefined) {
            // Mise à jour de l'état pour indiquer l'édition d'un message
            updateSendMessageStatus(prevState => ({
                ...prevState,
                isEditing: true,
                editId: messageToEdit._id,
                messageToEdit: messageToEdit.message
            }));
        } else {
            console.error(`No message found with id : ${_id}`);
        }
    }, [chatInfo?.messages.messagesList, updateSendMessageStatus]);

    const handleDelete = () => {
        if (chatInfo.chatId === chatId) {
            deleteMessage(_id);
        }
    };

    const handleReply = () => {
        // Logique pour l'action de réponse
        console.log('Répondre');
    };

    return (
        <Stack margin={1} color={customTheme.palette.slate[200]} >


            <Stack spacing={1} direction={'row'} justifyContent={currentUser.data?._id === senderId ? 'flex-end' : 'flex-start'}>
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    variants={{
                        hidden: { scale: 0.5, borderRadius: '0px' },
                        visible: { scale: 1, borderRadius: `${currentUser.data?._id === senderId ? '10px 0px 10px 10px' : '0px 10px 10px 10px'}` },
                        off: { scale: 1, borderRadius: `${currentUser.data?._id === senderId ? '10px 0px 10px 10px' : '0px 10px 10px 10px'}` },
                    }}
                    initial={chatInfo.sendMessageStatus.firstMessageSend ? 'hidden' : 'off'}
                    animate={chatInfo.sendMessageStatus.firstMessageSend ? 'visible' : 'off'}
                    exit="hidden"
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    style={{
                        maxWidth: '60%',
                        alignItems: 'flex-end',
                        padding: customTheme.spacing(1),
                        width: 'fit-content',
                        boxShadow: customTheme.shadows[5],
                        backdropFilter: 'blur(10px)',
                        backgroundColor: currentUser.data?._id !== senderId ? alpha(customTheme.palette.orangePV.main, 0.1) : alpha(customTheme.palette.slate[800], 0.5),
                        userSelect: 'none',
                    }}
                    onContextMenu={handleContextMenuOnMessage}
                >
                    <Fragment>
                        <Typography paragraph width={'100%'} textAlign={'left'} m={0} fontSize={customTheme.typography.body1.fontSize} sx={{
                            wordBreak: 'break-word',
                            letterSpacing: '0.3px',
                            lineHeight: '1.5',
                        }}>
                            {message}
                        </Typography>
                        <Stack direction={'row'} alignItems={'flex-center'} spacing={0.5} justifyContent={'flex-end'}>
                            <Typography fontSize={customTheme.typography.caption.fontSize} sx={{
                                transition: 'all 0.3s',
                                opacity: edited ? 1 : 0,
                                order: edited ? 1 : 0,
                            }}>
                                Modifier
                            </Typography>
                            <Typography fontSize={customTheme.typography.caption.fontSize} sx={{
                                order: read ? 0 : 1,
                            }}>
                                {new Date(createdAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                            </Typography>
                            <Visibility sx={{
                                fontSize: customTheme.typography.body1.fontSize,
                                transition: 'all 0.3s',
                                opacity: read ? 1 : 0,
                            }} />
                        </Stack>
                    </Fragment>
                    <ContextMenu
                        open={menuPosition !== null}
                        anchorReference="anchorPosition"
                        anchorPosition={menuPosition as PopoverPosition}
                        messageId={_id}
                        onEdit={handleEditMessage}
                        onDelete={handleDelete}
                        onReply={handleReply}
                        onCopy={handleCopy}
                        message={message}
                        menuPosition={menuPosition}
                        handleCloseMenu={handleCloseMenu}
                        handleContextMenu={handleContextMenuOnMessage}
                        senderId={senderId}
                        currentUserId={currentUser.data?._id}
                    />
                </motion.div>
            </Stack>

        </Stack >
    )
}
