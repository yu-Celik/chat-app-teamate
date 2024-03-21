import { Avatar, Menu, MenuItem, PopoverPosition, Skeleton, Stack, Typography, alpha, useMediaQuery } from "@mui/material";
import customTheme from "../../../styles/customTheme";
import { Visibility } from '@mui/icons-material/';
import { Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { useClipboard } from "../../../hooks/useClipboeard";

type User = {
    id: number;
    username: string;
    email: string;
    password: string;
    profilePic: string;
}

type MessageSendProps = {
    user: User
    isModify?: boolean
    view?: boolean
    isLoading?: boolean
}

export default function MessageSend({ user, isModify = false, view = false, isLoading = false }: MessageSendProps) {

    const isSmallScreen = useMediaQuery(customTheme.breakpoints.down('sm'));
    const isMediumScreen = useMediaQuery(customTheme.breakpoints.down('md'));
    const isLargeScreen = useMediaQuery(customTheme.breakpoints.down('lg'));

    const [menuPosition, setMenuPosition] = useState<{ top: number, left: number } | null>(null);

    const { copy } = useClipboard();

    const handleCopy = (text: string) => {
        copy(text);
    };

    const handleContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        setMenuPosition({ top: event.clientY, left: event.clientX });
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
        <Stack margin={1} color={customTheme.palette.background.default} onContextMenu={handleContextMenu}>
            {isLoading === true ? (
                <Skeleton variant="rectangular" width={isSmallScreen ? '10rem' : isMediumScreen ? '20rem' : isLargeScreen ? '25rem' : '35rem'} height={'3rem'} />
            ) : (

                <Stack spacing={1} direction={'row'} justifyContent={user.id === 1 ? 'flex-end' : 'flex-start'}>
                    {user.id !== 1 && < Avatar alt="user" src={user.profilePic} />}
                    <Stack direction={'column'} maxWidth={'60%'} alignItems={'flex-end'} padding={1} borderRadius={`${user.id === 1 ? '10px 0px 10px 10px' : '0px 10px 10px 10px'}`} width={'fit-content'} sx={{
                        boxShadow: customTheme.shadows[5],
                        backdropFilter: 'blur(10px)',
                        backgroundColor: user.id === 1 ? alpha(customTheme.palette.orangePV.main, 0.1) : alpha(customTheme.palette.slate[800], 0.5),
                        userSelect: 'none',
                        '& .MuiTypography-root': {
                            wordBreak: 'break-all',
                            letterSpacing: '0.3px',
                            lineHeight: '1.5',
                        },
                    }}>
                        <Fragment>
                            <Typography width={'100%'} padding={0.5} textAlign={user.id === 1 ? 'right' : 'left'} fontSize={customTheme.typography.body2.fontSize} color={user.id !== 1 ? customTheme.palette.primary.main : customTheme.palette.slate[200]}>{user.username}</Typography>
                            <Typography paragraph padding={0.5} m={0} fontSize={customTheme.typography.body1.fontSize} >
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis recusandae ipsa, quia illum assumenda nam ipsam. Nisi cum sit quis molestiae officiis architecto nostrum amet beatae! Corporis pariatur aperiam delectus?
                            </Typography>
                            <Stack direction={'row'} alignItems={'flex-center'} spacing={0.5}>
                                <Typography fontSize={customTheme.typography.caption.fontSize} sx={{
                                    transition: 'all 0.3s',
                                    opacity: isModify ? 1 : 0,
                                }}>
                                    Modifier
                                </Typography>
                                <Typography fontSize={customTheme.typography.caption.fontSize} sx={{
                                    order: view ? 0 : 1,
                                }}>
                                    12:00
                                </Typography>
                                <Visibility sx={{
                                    fontSize: customTheme.typography.body1.fontSize,
                                    transition: 'all 0.3s',
                                    opacity: view ? 1 : 0,
                                }} />
                            </Stack>
                        </Fragment>
                        <Menu
                            open={menuPosition !== null}
                            onClose={handleCloseMenu}
                            anchorReference="anchorPosition"
                            anchorPosition={menuPosition as PopoverPosition}
                            sx={{
                                '& .MuiMenu-paper': {
                                    backgroundColor: customTheme.palette.bluePV.dark,
                                    color: customTheme.palette.slate[300],
                                },
                                '& .MuiMenuItem-root': {
                                    '&:hover': {
                                        backgroundColor: customTheme.palette.transparant[100],
                                    },
                                },
                            }}
                        >
                            <MenuItem onClick={() => { handleEdit(); handleCloseMenu(); }}>Modifier</MenuItem>
                            <MenuItem onClick={() => { handleDelete(); handleCloseMenu(); }}>Supprimer</MenuItem>
                            <MenuItem onClick={() => { handleReply(); handleCloseMenu(); }}>Répondre</MenuItem>
                            <MenuItem onClick={() => { handleCopy('Votre message ici'); handleCloseMenu(); }}>Copier</MenuItem>
                        </Menu>
                    </Stack>
                </Stack>
            )}
        </Stack>
    )
}
