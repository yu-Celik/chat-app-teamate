import Typography from '@mui/material/Typography';
import { Avatar, Badge, ListItemAvatar, ListItemButton, ListItemText, Skeleton, Stack, alpha } from '@mui/material';
import { StyledBadge } from '../../BadgeRipple/BadgeRipple';
import customTheme from '../../../styles/customTheme';
import { Fragment } from 'react/jsx-runtime';
import { User } from '../../../types/Auth.type/Auth.Props';

type UserProfileProps = User & {
    isOnline?: boolean,
    inHeader: boolean,
    isLoading?: boolean,
}

export default function UserProfile({ username, profilePic, isOnline = false, inHeader, isLoading }: UserProfileProps) {

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
            {!isLoading ? (
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
                    </Stack>}
                </ListItemButton>) : (
                <Skeleton variant="rectangular" width={'100%'} height={inHeader ? '55px' : '86px'} />
            )}

        </Typography>
    )
}