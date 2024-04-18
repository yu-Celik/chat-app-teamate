import { useState } from "react";
import { AppBar, Toolbar, Badge, MenuItem, Menu, Button, Link, useMediaQuery, Stack, Divider, MenuList, Avatar, ClickAwayListener } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { AddBoxRounded, Home, Logout, Notifications, Notifications as NotificationsIcon, Settings } from '@mui/icons-material';
import customTheme from "../../styles/customTheme";
import { StyledIconButton } from "../IconButton/IconButton";
import { SearchBarInDialog } from "../SearchBar/SearchBarInDialog";
import LogoTeamateIcon from "../Logo/LogoTeamateIcon";
import useAuth from "../../contexts/AuthContext/useAuthContext";
import useLogout from "../../hooks/Auth/useLogout";
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { heightHeader } from "../../styles/customTheme";
import DialogBox from "../DialoguePublication/DialoguePublication";

const pages = ['Accueil', 'Jouer', 'Profil', 'Messagerie'];

export default function Header() {
    const { currentUser } = useAuth();
    const { logoutUser } = useLogout();
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);
    const [notificationsAnchorEl, setNotificationsAnchorEl] = useState<null | HTMLElement>(null);
    const [openPublication, setOpenPublication] = useState(false);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [hoveredPage, setHoveredPage] = useState<string | null>(null);
    const location = useLocation();
    const is300Up = useMediaQuery(customTheme.breakpoints.up(300));
    const isChatPage = location.pathname.toLocaleLowerCase().includes('/chat');

    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const notificationsOpen = Boolean(notificationsAnchorEl);

    const handleClose = (): void => {
        setOpen(false);
    };

    const handleClosePublication = (): void => {
        setOpenPublication(false);
    };

    const handleNoticationsMenuOpen = (event: React.MouseEvent<HTMLElement>): void => {
        setNotificationsAnchorEl(event.currentTarget);
        console.log('NotificationsMenuOpen');
    };

    const handleMobileMenuClose = (): void => {
        setMobileMoreAnchorEl(null);
    };


    const handleCloseNavMenu = (): void => {
        console.log('CloseNavMenu');
    };

    const handleMenuClose = (): void => {
        handleMobileMenuClose();
        console.log('MenuClose');
    };

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>): void => {
        setMobileMoreAnchorEl(event.currentTarget);
        console.log('MobileMenuOpen');
    };


    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={() => {
                handleMobileMenuClose();
                console.log('MobileMenuClose');
            }}
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

            <MenuItem>
                <StyledIconButton
                    title="Mon Compte"
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                >
                    <Avatar
                        sx={{
                            width: '1.5rem',
                            height: '1.5rem',
                            cursor: 'pointer',
                        }}
                        alt={currentUser.data?.username || ''}
                        src={currentUser.data?.profilePic || ''} />
                </StyledIconButton>
                <p>Paramètres de compte</p>
            </MenuItem>
            <MenuItem onClick={() => {
                handleMenuClose();
                if (logoutUser !== undefined && logoutUser !== null) {
                    logoutUser();
                }
            }}>
                <StyledIconButton
                    title="Notifications"
                    size="large"
                    aria-label={`show ${0} new notifications`}
                    menustyle='true'
                >
                    <Logout />
                </StyledIconButton>
                <p>Déconnexion</p>
            </MenuItem>
        </Menu>
    );

    const renderNoticationsMenu = (
        <Menu
            anchorEl={notificationsAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id="notifications-menu"
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={notificationsOpen}
            onClose={() => {
                setNotificationsAnchorEl(null);
                console.log('NotificationsMenuClose');
            }}
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
            <MenuList color='warning' sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                height: '100%',
                padding: '0',
                margin: '0',

            }}>
                <MenuItem sx={{
                    color: customTheme.palette.slate[300],
                    paddingY: '0.5rem',
                }}>
                    Notifications
                </MenuItem>
                {4 > 0 && <MenuItem
                    onClick={() => {
                        // if (markAllNotificationsAsRead !== undefined && notifications !== undefined) {
                        //     markAllNotificationsAsRead(notifications);
                        // }
                        setNotificationsAnchorEl(null);
                    }}
                    sx={{
                        color: customTheme.palette.slate[300],
                    }}>
                    Tout marquer comme lu
                </MenuItem>}

            </MenuList>
            <Divider sx={{ backgroundColor: customTheme.palette.slate[300] }} />
            {/* {modifiedNotifications?.map((n) => (
                <MenuItem key={n._id} sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    marginBottom: '0.1rem',
                    backgroundColor: customTheme.palette.orangePV.light,
                    '&:hover': {
                        backgroundColor: customTheme.palette.orangePV.main,
                    },

                }}>
                    <ListItemText
                        onClick={() => {
                            if (markNotificationAsRead !== undefined && userChats !== undefined) {
                                markNotificationAsRead(n, userChats, user, notifications);
                            }
                            setNotificationsAnchorEl(null);
                        }}
                        sx={{
                            width: '100%',
                            color: customTheme.palette.slate[300],
                            paddingY: '0.5rem',

                            '& .MuiListItemText-primary': {
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                fontSize: '0.9rem',
                                fontWeight: 600,
                            },
                            '& .MuiListItemText-secondary': {
                                fontSize: '0.7rem',
                                color: customTheme.palette.slate[300],

                            },
                        }}
                        primary={
                            <>
                                <Typography sx={{ display: 'flex', flexDirection: 'row' }} noWrap >{n.senderName}
                                    <Typography pl={0.5} noWrap>
                                        vous a envoyé un message
                                    </Typography>
                                </Typography>
                                <Badge color='warning' variant='dot' invisible={n.isRead}
                                    sx={{
                                        '& .MuiBadge-colorWarning': {
                                            backgroundColor: '#FF7300',
                                            color: '#FFFFE6',
                                        },
                                        '& .MuiBadge-badge': {
                                            fontWeight: 'bold',
                                            position: 'static',
                                            transform: 'none',
                                        },
                                        '& .MuiBadge-dot': {
                                            width: '0.75rem',
                                            height: '0.75rem',
                                            borderRadius: '50%',
                                        },

                                    }}
                                />
                            </>
                        }
                        secondary={formatDate(n.date)}
                    />
                </MenuItem>
            ))} */}
            {/* {unreadNotifications.length < 1 && <MenuItem sx={{
                color: customTheme.palette.slate[300],
                paddingY: '1rem',
            }}>
                Aucune nouvelle notification
            </MenuItem>} */}

        </Menu>
    );



    return (
        <>
            <AppBar position="static" color="transparent">
                <Toolbar sx={{
                    minHeight: { heightHeader },
                }}>
                    <Grid container alignItems="center" flexGrow={1} minHeight={heightHeader} justifyContent={'space-between'}>
                        <Grid md={5} id={'desktop-menu'} display={{ xs: 'none', md: 'flex' }}>
                            {pages.map((page) => (
                                <Stack key={page} sx={{ my: 2 }}>
                                    <Button
                                        component={RouterLink}
                                        to={page === 'Messagerie' ? '/chat' : page === 'Accueil' ? '/' : `/${page.toLowerCase()}`}
                                        onClick={handleCloseNavMenu}
                                        sx={{ color: customTheme.palette.slate[200], display: 'block', '&:hover': { color: customTheme.palette.slate[300] } }}
                                        onMouseEnter={() => { setHoveredPage(page); }}
                                        onMouseLeave={() => { setHoveredPage(null); }}
                                    >
                                        {page}
                                    </Button>
                                    <Divider sx={{
                                        width: hoveredPage === page ? '100%' : '0%',
                                        backgroundColor: customTheme.palette.common.white,
                                        height: '1px',
                                        transition: 'width 0.5s',
                                    }} />
                                </Stack>
                            ))}
                        </Grid>
                        <Grid xs={6} md={2} id={'logo-container'} display={'flex'} alignItems={'center'} minHeight={heightHeader} justifyContent={{ xs: 'flex-start', md: 'center' }}>
                            <LogoTeamateIcon
                                id="md"
                                onClick={() => navigate('/accueil')}
                                sx={{
                                    width: '3rem',
                                    height: '100%',
                                    minHeight: heightHeader,
                                }}
                            />
                            {is300Up && <Link
                                component={RouterLink}
                                variant="h5"
                                noWrap
                                to="/accueil"
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    minHeight: heightHeader,
                                    fontWeight: 700,
                                    letterSpacing: '.1rem',
                                    color: 'transparent',
                                    textDecoration: 'none',
                                    background: 'linear-gradient(90deg, #E9695B, #E7378B, #F4BE5C)',
                                    backgroundSize: '200% auto',
                                    WebkitBackgroundClip: 'text',
                                    backgroundClip: 'text',
                                    animation: 'gradient 3s linear infinite',
                                    '@keyframes gradient': {
                                        '0%': { backgroundPosition: '0% 50%' },
                                        '50%': { backgroundPosition: '100% 50%' },
                                        '100%': { backgroundPosition: '0% 50%' },
                                    },
                                }}
                            >
                                eamate
                            </Link>}
                        </Grid>
                        <Grid md={5} id={'desktop-buttons'} display={{ xs: 'none', md: 'flex' }} justifyContent={'flex-end'}>
                            <StyledIconButton
                                title="Publier"
                                size="large"
                                aria-label="publier"
                                onClick={() => setOpenPublication(true)}
                            >
                                <AddBoxRounded />
                            </StyledIconButton>
                            <StyledIconButton
                                title="Notifications"
                                size="large"
                                aria-label={`show ${0} new notifications`}
                                onClick={handleNoticationsMenuOpen}
                            >
                                <Badge badgeContent={0} color="error">
                                    <NotificationsIcon />
                                </Badge>
                            </StyledIconButton>
                            <StyledIconButton
                                title='Menu'
                                size="large"
                                aria-label="menu"
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                            >
                                <Settings />
                            </StyledIconButton>
                        </Grid>
                        <Grid xs={4} id={'Mobile-buttons'} display={{ xs: 'flex', md: 'none' }} alignItems={'center'} minHeight={heightHeader} justifyContent={'flex-end'}>
                            {isChatPage && <StyledIconButton
                                title="Accueil"
                                size="large"
                                aria-label="accueil"
                                onClick={() => navigate('/accueil')}

                            >
                                <Home />
                            </StyledIconButton>}
                            <StyledIconButton
                                title="Notifications"
                                size="large"
                                aria-label="notifications"
                                aria-haspopup='true'
                                onClick={handleNoticationsMenuOpen}
                            >
                                <Notifications />
                            </StyledIconButton>
                            <StyledIconButton
                                title='Menu'
                                size="large"
                                aria-label="menu"
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                            >
                                <Settings />
                            </StyledIconButton>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderNoticationsMenu}
            <ClickAwayListener onClickAway={handleClose}>
                <DialogBox open={openPublication} handleClose={handleClosePublication} />
            </ClickAwayListener>
            <SearchBarInDialog
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                onClose={handleClose}
                open={open}
            ></SearchBarInDialog>
        </>
    );
}