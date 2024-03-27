import { PopoverPosition, Skeleton, Stack, Typography, alpha, useMediaQuery } from "@mui/material";
import customTheme from "../../../styles/customTheme";
import { Visibility } from '@mui/icons-material/';
import { Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { useClipboard } from "../../../hooks/useClipboeard";
import ContextMenu from "../ContextMenu/ContextMenu";
import { Message } from "../../../types/Chat.type/Chat.Props";
import useAuth from "../../../contexts/AuthContext/useAuthContext";






export default function MessageSend({ _id, chatId, senderId, receiverId, replyTo, message, messageType, read, edited, imageUrls, createdAt, updatedAt, isLoading }: Message & { isLoading: boolean }) {

    const { currentUser } = useAuth();

    const isSmallScreen = useMediaQuery(customTheme.breakpoints.down('sm'));
    const isMediumScreen = useMediaQuery(customTheme.breakpoints.down('md'));
    const isLargeScreen = useMediaQuery(customTheme.breakpoints.down('lg'));

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
            // Utilisez un timeout pour s'assurer que le menu est fermé avant de réouvrir un nouveau
            // Cela permet d'éviter que le même clic ne soit interprété comme une tentative de fermeture du menu
            setTimeout(() => {
                openMenuAtPosition(event);
            }, 0);
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

    const handleEdit = () => {
        // Logique pour l'action de modification
        console.log('Modifier');
    };

    const handleDelete = () => {
        // Logique pour l'action de suppression
        console.log('Supprimer');
    };

    const handleReply = () => {
        // Logique pour l'action de réponse
        console.log('Répondre');
    };

    return (
        <Stack margin={1} color={customTheme.palette.background.default} >
            {isLoading === true ? (
                <Skeleton variant="rectangular" width={isSmallScreen ? '10rem' : isMediumScreen ? '20rem' : isLargeScreen ? '25rem' : '35rem'} height={'3rem'} />
            ) : (

                <Stack spacing={1} direction={'row'} justifyContent={currentUser.data?._id === senderId ? 'flex-end' : 'flex-start'}>
                    <Stack
                        direction={'column'}
                        maxWidth={'60%'}
                        alignItems={'flex-end'}
                        padding={1}
                        borderRadius={`${currentUser.data?._id === senderId ? '10px 0px 10px 10px' : '0px 10px 10px 10px'}`}
                        width={'fit-content'}
                        sx={{
                            boxShadow: customTheme.shadows[5],
                            backdropFilter: 'blur(10px)',
                            backgroundColor: currentUser.data?._id !== senderId ? alpha(customTheme.palette.orangePV.main, 0.1) : alpha(customTheme.palette.slate[800], 0.5),
                            userSelect: 'none',
                            '& .MuiTypography-root': {
                                wordBreak: 'break-all',
                                letterSpacing: '0.3px',
                                lineHeight: '1.5',
                            },
                        }}
                        onContextMenu={handleContextMenuOnMessage} // Attache le gestionnaire ici
                    >
                        <Fragment>
                            <Typography paragraph width={'100%'} textAlign={'left'} m={0} fontSize={customTheme.typography.body1.fontSize} >
                                {message}
                            </Typography>
                            <Stack direction={'row'} alignItems={'flex-center'} spacing={0.5}>
                                <Typography fontSize={customTheme.typography.caption.fontSize} sx={{
                                    transition: 'all 0.3s',
                                    opacity: edited ? 1 : 0,
                                }}>
                                    Modifier
                                </Typography>
                                <Typography fontSize={customTheme.typography.caption.fontSize} sx={{
                                    order: read ? 0 : 1,
                                }}>
                                    {new Date(createdAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
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
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            onReply={handleReply}
                            onCopy={handleCopy}
                            message={'Votre message ici'}
                            menuPosition={menuPosition}
                            handleCloseMenu={handleCloseMenu}
                            handleContextMenu={handleContextMenuOnMessage}
                        />
                    </Stack>
                </Stack>
            )}
        </Stack>
    )
}
