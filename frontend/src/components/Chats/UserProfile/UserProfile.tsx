import Typography from '@mui/material/Typography';
import { Avatar, Badge, ListItemAvatar, ListItemButton, ListItemText, PopoverPosition, Skeleton, Stack, alpha } from '@mui/material';
import { StyledBadge } from '../../BadgeRipple/BadgeRipple';
import customTheme from '../../../styles/customTheme';
import { Fragment } from 'react/jsx-runtime';
import { User } from '../../../types/Auth.type/Auth.Props';
import { useState } from 'react';
import ContextMenu from '../ContextMenu/ContextMenu';

type UserProfileProps = User & {
    isOnline?: boolean,
    inHeader: boolean,
    isLoading?: boolean,
    onDelete?: (chatId: string) => void,
    isLoadingUserChat?: boolean,
    isLoadingCreateChat?: boolean,
    isLoadingDeleteChat?: boolean,
    chatId?: string,
}

export default function UserProfile({ username, profilePic, isOnline = false, inHeader, isLoadingUserChat, isLoadingCreateChat, isLoadingDeleteChat, onDelete, chatId }: UserProfileProps) {
    const [menuPosition, setMenuPosition] = useState<{ top: number, left: number } | null>(null);

    const handleContextMenuOnChat = (event: React.MouseEvent<HTMLDivElement>) => {
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
        const userProfileElement = event.currentTarget; // Obtient l'élément de message
        const rect = userProfileElement.getBoundingClientRect(); // Obtient la position et les dimensions de l'élément

        // Calcule la position du menu pour qu'il s'affiche à l'intérieur du message
        setMenuPosition({
            top: rect.top + window.scrollY, // Ajuste en fonction du défilement de la page
            left: rect.right + window.scrollX,
        });
    };

    const handleCloseMenu = () => {
        setMenuPosition(null);
    };





    return (
        <Typography
            onContextMenu={handleContextMenuOnChat}
            variant="h6"
            noWrap
            component="div"
            sx={{
                flexGrow: 1,
                boxShadow: inHeader ? customTheme.shadows[0] : customTheme.shadows[1],
                '& .MuiListItemButton-root:hover': {
                    backgroundColor: alpha(customTheme.palette.slate[100], 0.1),
                }
            }}
        >
            {!isLoadingUserChat && !isLoadingCreateChat && !isLoadingDeleteChat ? (
                <ListItemButton alignItems="flex-start" sx={{
                    padding: inHeader ? customTheme.spacing(0, 1) : customTheme.spacing(1),
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <ListItemAvatar
                        sx={{
                            margin: '0px',
                        }}
                    >
                        <StyledBadge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot"
                            isOnline={isOnline}
                        >
                            <Avatar alt="Remy Sharp" src={profilePic} />
                        </StyledBadge>
                    </ListItemAvatar>
                    {inHeader === false ? (
                        <ListItemText
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                height: '70px',
                                margin: '0px',
                                gap: '1px',
                            }}
                            primary={<Typography
                                sx={{
                                    display: 'block',
                                    width: '100%',
                                }}
                                fontSize={customTheme.typography.body1.fontSize}
                                textTransform={'capitalize'}
                                component="span"
                                variant="body2"
                                color={customTheme.palette.slate[200]}
                                noWrap
                            >
                                {username}
                            </Typography>}
                            secondary={
                                <Typography
                                    sx={{
                                        display: 'inline-block',
                                        width: '100%',
                                    }}
                                    component="span"
                                    variant="body2"
                                    fontSize={customTheme.typography.body2.fontSize}
                                    color={customTheme.palette.slate[200]}
                                    noWrap
                                >
                                    {username}
                                </Typography>
                            }
                        />
                    ) : (<ListItemText
                        sx={{
                            margin: '0px',
                        }}
                        primary={<Typography
                            sx={{
                                display: 'block',
                            }}
                            fontSize={customTheme.typography.body1.fontSize}
                            textTransform={'capitalize'}
                            component="span"
                            variant="body2"
                            color={customTheme.palette.slate[200]}
                            noWrap
                        >
                            {username}
                        </Typography>}
                        secondary={
                            <Fragment>
                                {isOnline ? (
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color={customTheme.palette.slate[200]}
                                    >
                                        En ligne
                                    </Typography>
                                ) : (
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color={customTheme.palette.slate[200]}
                                        fontSize="small"
                                        fontStyle="italic"
                                    >
                                        date
                                    </Typography>
                                )}
                            </Fragment>
                        }
                    />)}
                    {inHeader === false && <Stack flexGrow={1} spacing={0.5} pt={0.5} pr={1} direction={'column'} alignItems={'flex-end'} justifyContent={'center'}>
                        <Typography
                            variant='caption'
                            noWrap
                            color={customTheme.palette.slate[200]}
                            fontSize={customTheme.typography.caption.fontSize}
                            sx={{
                                display: 'block',
                            }}>
                            date
                        </Typography>
                        <Badge
                            badgeContent={4}
                            showZero={false}
                            color="error"
                            sx={{
                                '& .MuiBadge-colorWarning': {
                                    backgroundColor: '#FF7300',
                                    color: '#FFFFE6',
                                },
                                '& .MuiBadge-badge': {
                                    fontWeight: 'bold',
                                    position: 'static',
                                    transform: 'translate(0%, 0%)',
                                },

                            }}
                        />
                        {menuPosition !== null && (
                            <ContextMenu
                                open={menuPosition !== null}
                                chatId={chatId as string}
                                anchorReference="anchorPosition"
                                anchorPosition={menuPosition as PopoverPosition}
                                onDelete={() => onDelete && onDelete(chatId as string)}
                                message={'Votre message ici'}
                                menuPosition={menuPosition}
                                handleCloseMenu={handleCloseMenu}
                                handleContextMenu={handleContextMenuOnChat}
                            />
                        )}
                    </Stack>}
                </ListItemButton>) : (
                <Skeleton variant="rectangular" width={'100%'} height={inHeader ? '55px' : '86px'} />
            )}

        </Typography>
    )
}