import Typography from '@mui/material/Typography';
import { Avatar, Box, ListItemAvatar, ListItemButton, ListItemText, alpha } from '@mui/material';
import { StyledBadge } from '../../BadgeRipple/BadgeRipple';
import customTheme from '../../../styles/customTheme';
import { User } from '../../../types/Auth.type/Auth.Props';
import formatLastLogin from '../../../utils/dateUtils';


type UserProfileProps = User & {
    isOnline?: boolean,
    isLoading?: boolean,
    onlineUsers: string[]
    userId: string
}

export default function ProfileInHeader({ username, profilePic, lastLogin, onlineUsers, userId }: UserProfileProps) {

    const isUserOnline = onlineUsers.includes(userId);
    return (
        <Typography
            variant="h6"
            noWrap
            component="div"
            minHeight={'67.5px'}
            sx={{
                flexGrow: 1,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                '& .MuiListItemButton-root:hover': {
                    backgroundColor: alpha(customTheme.palette.slate[100], 0.1),
                }
            }}

        >
            <ListItemButton disableGutters sx={{
                display: 'flex',
                padding: customTheme.spacing(1.5, 2),
                maxHeight: '58px',
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
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            {isUserOnline ? (
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color={customTheme.palette.slate[200]}
                                    noWrap
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
                                    noWrap
                                >
                                    {username && `Dernière connexion : ${formatLastLogin(lastLogin as string)}`}
                                </Typography>
                            )}
                        </Box>
                    }
                />
            </ListItemButton>
        </Typography>
    )
}