import Typography from '@mui/material/Typography';
import { Avatar, ListItemAvatar, ListItemButton, ListItemText, alpha } from '@mui/material';
import { StyledBadge } from '../../BadgeRipple/BadgeRipple';
import customTheme from '../../../styles/customTheme';
import { Fragment } from 'react/jsx-runtime';
import { User } from '../../../types/Auth.type/Auth.Props';


type UserProfileProps = User & {
    isOnline?: boolean,
    isLoading?: boolean,
}

export default function ProfileInHeader({ username, profilePic, isOnline = false, lastLogin }: UserProfileProps) {










    return (
        <Typography
            variant="h6"
            noWrap
            component="div"
            minHeight={'67.5px'}
            sx={{
                flexGrow: 1,
                display : 'flex',
                justifyContent : 'space-between',
                alignItems : 'center',
                '& .MuiListItemButton-root:hover': {
                    backgroundColor: alpha(customTheme.palette.slate[100], 0.1),
                }
            }}

        >
                <ListItemButton disableGutters sx={{
                    display : 'flex',
                    padding : customTheme.spacing(1.5, 2),
                    maxHeight : '58px',
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
                            <Avatar alt="Remy Sharp" src={profilePic || ''}  />
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
                                        {username && `Dernière connexion : ${new Date(lastLogin as string).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}`}
                                    </Typography>
                                )}
                            </Fragment>
                        }
                    />
                </ListItemButton>
        </Typography>
    )
}