import { useState } from "react";
import { AppBar, Box, Toolbar, Typography, Badge, MenuItem, Menu, Button, Link, Stack, Divider, MenuList, styled } from '@mui/material';
import { AccountCircle, Mail as MailIcon, Notifications as NotificationsIcon, MoreVert as MoreIcon } from '@mui/icons-material';
import customTheme from "../../styles/customTheme";
import { StyledIconButton } from "../IconButton/IconButton";
import LogoTeamateIcon from "../Logo/LogoTeamateIcon";
import BurgerButtonMui from "../Button/BurgerButtonMui";


import { Link as RouterLink } from 'react-router-dom';

const StyledBox = styled(Box)({
    width: '10rem',
    height: '2.5rem',
    borderRadius: '1rem',
    backgroundColor: 'rgba(243, 129, 99, 0.9)',
    border: '1px solid #000000',
    fontSize: '0.875rem',
    textTransform: 'capitalize',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    textDecoration: 'none',
    '&:hover': {
        backgroundColor: 'rgba(243, 129, 99, 0.7)', // change color on hover
    },
});

const pages = ['Accueil', 'Événement', 'Calendrier'];

const StyledStack = styled(Stack)(() => ({
    [customTheme.breakpoints.up('xss')]: {
        width: '5ch',
    },
    [customTheme.breakpoints.up('xs')]: {
        width: '100%',
    },
}));
export default function DisconnectedHeader() {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);
    const [notificationsAnchorEl, setNotificationsAnchorEl] = useState<null | HTMLElement>(null);

    // const [open, setOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [hoveredPage, setHoveredPage] = useState<string | null>(null);
    // const isSmUp = useMediaQuery(customTheme.breakpoints.up('sm'));
    // const isMdUp = useMediaQuery(customTheme.breakpoints.up('md'));

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const notificationsOpen = Boolean(notificationsAnchorEl);

    // const theme = useTheme();
    // const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); // lorsque l'écran est petit


    // const handleOpen = (): void => { // ouverture de la boîte de dialogue de recherche
    //     if (isSmallScreen) {
    //         setOpen(true);
    //     }
    // };

    // const handleClose = (): void => {
    //     setOpen(false);
    // };

    const handleNoticationsMenuOpen = (event: React.MouseEvent<HTMLElement>): void => {
        setNotificationsAnchorEl(event.currentTarget);
        console.log('NotificationsMenuOpen');
    };

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>): void => {
        setAnchorEl(event.currentTarget);
        console.log('ProfileMenuOpen');
    };

    const handleMobileMenuClose = (): void => {
        setMobileMoreAnchorEl(null);
    };

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>): void => {
        setAnchorElNav(event.currentTarget);
        console.log('OpenNavMenu');
        // nav
    };

    const handleCloseNavMenu = (): void => {
        setAnchorElNav(null);
        setIsHovered(false);
        console.log('CloseNavMenu');
        // nav
    };

    const handleMenuClose = (): void => {
        setAnchorEl(null);
        handleMobileMenuClose();
        console.log('MenuClose');
    };

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>): void => {
        setMobileMoreAnchorEl(event.currentTarget);
        console.log('MobileMenuOpen');
    };


    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={() => {
                setAnchorEl(null);
                console.log('MenuClose');
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
            <MenuItem onClick={handleMenuClose}>Username</MenuItem>
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem
            // onClick={() => {
            //     handleMenuClose();
            //     if (logoutUser !== undefined && logoutUser !== null) {
            //         logoutUser();
            //     }
            // }}
            >Déconnexion</MenuItem>
        </Menu>
    );

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
                setAnchorEl(null);
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
                    title="Messages"
                    size="large"
                    ria-label="show 4 new mails"
                    menustyle='true'
                >
                    <Badge badgeContent={4} color="error">
                        <MailIcon />
                    </Badge>
                </StyledIconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem onClick={handleNoticationsMenuOpen}>
                <StyledIconButton
                    title="Notifications"
                    size="large"
                    aria-label={`show ${4} new notifications`}
                    menustyle='true'
                >
                    <Badge badgeContent={4} color="error">
                        <NotificationsIcon />
                    </Badge>
                </StyledIconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <StyledIconButton
                    title="Mon Compte"
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    menustyle='true'

                >
                    <AccountCircle />
                </StyledIconButton>
                <p>Mon Compte</p>
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
            <Stack height={68.5}>
                <AppBar position="static" color="transparent">
                    <Toolbar>
                        <Box sx={{ flexGrow: 1, py: 1, display: { xs: 'flex', md: 'none' } }}>
                            <BurgerButtonMui
                                size='large'
                                aria-label="open drawer"
                                open={isHovered}
                                onClick={(event) => {
                                    setIsHovered(!isHovered);
                                    handleOpenNavMenu(event);
                                }}
                            />
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
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
                                {pages.map((page) => (
                                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">{page}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {pages.map((page) => (
                                <Stack key={page} sx={{ my: 2 }}>
                                    <Button
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
                        </Box>
                        <StyledStack direction={'row'} width={'fit-content'} justifyContent={'center'} alignItems={'flex-end'} marginRight={{ xs: customTheme.spacing(2), sm: '0' }}>
                            <LogoTeamateIcon
                                id="md"
                                href='/'
                                sx={{
                                    width: '3rem',
                                    height: '100%',
                                    marginLeft: '1rem',
                                }}
                            />
                            <Link
                                variant="h5"
                                noWrap
                                href="/"
                                sx={{
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
                            </Link>
                        </StyledStack>
                    </Toolbar>
                </AppBar>
                {renderMobileMenu}
                {renderMenu}
                {renderNoticationsMenu}
            </Stack>
        </>
    );
}