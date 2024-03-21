import Typography from '@mui/material/Typography';
import { Avatar, Badge, ListItemAvatar, ListItemButton, ListItemText, Skeleton, Stack, alpha } from '@mui/material';
import { format, formatDistanceToNow } from 'date-fns';
import { StyledBadge } from '../../BadgeRipple/BadgeRipple';
import customTheme from '../../../styles/customTheme';
import { Fragment } from 'react/jsx-runtime';

export default function UserProfile({ username, profilePic, isOnline, lastSeen, inHeader, lastMessageSeen, notifications, lastNotificationSeen, isLoading = false }: { username: string, profilePic: string, isOnline: boolean, lastSeen: string, inHeader: boolean, lastMessageSeen?: string, notifications?: number, lastNotificationSeen?: string, isLoading?: boolean }) {
    return (
        <Typography
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
            {isLoading === false ? (
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
                                    {lastMessageSeen}
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
                                        Vu récemment : {formatDistanceToNow(new Date(lastSeen))}
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
                            {lastNotificationSeen != null && format(new Date(lastNotificationSeen), 'HH:mm')}
                        </Typography>
                        <Badge
                            badgeContent={notifications}
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
                    </Stack>}
                </ListItemButton>) : (
                <Skeleton variant="rectangular" width={'100%'} height={inHeader ? '55px' : '86px'} />
            )}

        </Typography>
    )
}