import Typography from '@mui/material/Typography';
import { Avatar, Badge, Fade, ListItemAvatar, ListItemButton, ListItemText, Skeleton, Stack, alpha } from '@mui/material';
import { format } from 'date-fns';
import customTheme from '../../../styles/customTheme';
import { User } from '../../../data/userData';
import { Fragment } from 'react/jsx-runtime';
import { useEffect, useState } from 'react';

export default function GroupeDisplay({ name, members, lastMessage, lastMessageSender, profilePic, inHeader, lastNotificationSeen, notifications, isLoading = false }: { name: string, members: User[], lastMessage: string, lastMessageSender: User, profilePic: string, inHeader: boolean, lastNotificationSeen: string, notifications: number, isLoading?: boolean }) {

    const [showFade, setShowFade] = useState(true);
    const [displayedText, setDisplayedText] = useState(members.map((member) => member?.username).join(', '));

    useEffect(() => {
        const interval = setInterval(() => {
            setShowFade(false);
            setTimeout(() => {
                setDisplayedText(prevText => prevText === members.map((member) => member?.username).join(', ') ? `${lastMessageSender?.username} : ${lastMessage}` : members.map((member) => member?.username).join(', '));
                setShowFade(true);
            }, 500);
        }, 5000);

        return () => clearInterval(interval);
    }, [members, lastMessageSender, lastMessage]);

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
            {isLoading === false ? (<ListItemButton alignItems="flex-start" sx={{
                padding: inHeader ? customTheme.spacing(0, 1) : customTheme.spacing(1),
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                <ListItemAvatar
                    sx={{
                        margin: '0px',
                    }}
                >
                    <Avatar alt="Remy Sharp" src={profilePic} />
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
                            {name}
                        </Typography>}
                        secondary={
                            <Fade in={showFade} timeout={500}>
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
                                    {displayedText}
                                </Typography>
                            </Fade>
                        }
                    />
                ) : (<ListItemText
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
                        {name}
                    </Typography>}
                    secondary={
                        <Fragment>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color={customTheme.palette.slate[200]}
                            >
                                {members.map((member) => member.username).join(', ')}
                            </Typography>
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