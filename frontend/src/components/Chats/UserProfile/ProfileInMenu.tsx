import Typography from '@mui/material/Typography';
import { Avatar, Box, ListItemAvatar, ListItemButton, ListItemText, Skeleton, alpha } from '@mui/material';
import { StyledBadge } from '../../BadgeRipple/BadgeRipple';
import customTheme from '../../../styles/customTheme';
import { User } from '../../../types/Auth.type/Auth.Props';
import formatLastLogin from '../../../utils/dateUtils';

type UserProfileProps = User & {
    isOnline?: boolean,
    isLoading?: boolean,
    onDelete?: (chatId: string) => void,
    isLoadingUserChat?: boolean,
    isLoadingAllUsers?: boolean,
    lastLogin?: string | null,
    onClick?: () => void
    onlineUsers: string[]
    userId: string
}

export default function ProfileInMenu({ username, profilePic, onClick, lastLogin, isLoadingUserChat, isLoadingAllUsers, onlineUsers, userId }: UserProfileProps) {

    const handleContextMenuOnChat = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation(); // Empêche le menu contextuel par défaut du navigateur
        event.preventDefault(); // Empêche le menu contextuel par défaut du navigateur
    };
    const isUserOnline = onlineUsers.includes(userId);

    return (
        <>
            {isLoadingAllUsers && isLoadingUserChat ? (
                <Skeleton variant="rectangular" width={'100%'} height={'70px'} />
            ) : (
                <Typography
                    onContextMenu={handleContextMenuOnChat}
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{
                        flexGrow: 1,
                        boxShadow: customTheme.shadows[1],
                        '& .MuiListItemButton-root:hover': {
                            backgroundColor: alpha(customTheme.palette.slate[100], 0.1),
                        }
                    }}
                    onClick={onClick}
                >
                    <ListItemButton alignItems="flex-start" sx={{
                        padding: customTheme.spacing(0, 1),
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
                                isOnline={isUserOnline}
                            >
                                <Avatar alt="Remy Sharp" src={profilePic || ''} />
                            </StyledBadge>
                        </ListItemAvatar>
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
                                <Box>
                                    {isUserOnline ? (
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
                                            En ligne
                                        </Typography>
                                    ) : (
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
                                            {username && `Dernière connexion : ${formatLastLogin(lastLogin as string)}`}
                                        </Typography>)}
                                </Box>
                            }
                        />
                    </ListItemButton>
                </Typography>
            )}
        </>
    )
}