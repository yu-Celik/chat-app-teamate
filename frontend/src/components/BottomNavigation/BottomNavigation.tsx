import { Link as RouterLink } from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { AddBoxRounded, Mail, HomeRounded, SportsEsportsRounded, } from '@mui/icons-material';
import ImageAvatars from '../ImageAvatars/ImageAvatars';
import customTheme from './../../styles/customTheme.ts';
import { useLocation } from 'react-router-dom';
import DialogBox from '../DialoguePublication/DialoguePublication.tsx';
import { SyntheticEvent, useEffect, useState } from 'react';
import { alpha } from '@mui/material';

const pages = [
    { label: 'Accueil', path: '/accueil', icon: <HomeRounded sx={{ color: customTheme.palette.slate[200], width: "28px", height: "28px" }} /> },
    { label: 'Jouer', path: '/jouer', icon: <SportsEsportsRounded sx={{ color: customTheme.palette.slate[200], width: "28px", height: "28px" }} /> },
    { label: 'Publication' },
    { label: 'Messagerie', path: '/chat', icon: <Mail sx={{ color: customTheme.palette.slate[200], width: "28px", height: "28px" }} /> },
    { label: 'Profil', path: '/profil', icon: <ImageAvatars sx={{ width: "28px", height: "28px" }} /> }
];

export default function LabelBottomNavigation() {

    const location = useLocation();
    const [valueNav, setValueNav] = useState(location.pathname);
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        setValueNav(location.pathname);
    }, [location]);

    const handleChangeNav = (_: SyntheticEvent, newValue: string) => {
        setValueNav(newValue);
    };

    return (
        <>
            <BottomNavigation
                component={'footer'}
                sx={{
                    margin: '0 auto',
                    width: '100vw',
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1000,
                    backgroundColor: alpha(customTheme.palette.bluePV.dark, 0.5),
                    color: customTheme.palette.slate[200],
                    backdropFilter: 'blur(20px) brightness(30%)',
                    WebkitBackdropFilter: 'blur(20px) brightness(30%)',
                    MozBackdropFilter: 'blur(20px) brightness(30%)',
                    "& .MuiBottomNavigationAction-root.Mui-selected": {
                        color: customTheme.palette.slate[200],
                    },
                    "& .MuiButtonBase-root": {
                        minWidth: '0px',
                    },
                }}
                value={valueNav}
                onChange={handleChangeNav}
            >
                {pages.map((page) => (
                    page.label === 'Publication' ? (
                        <BottomNavigationAction
                            key="publier"
                            value="publier"
                            onClick={handleClickOpen}
                            icon={<AddBoxRounded sx={{ color: customTheme.palette.slate[200], width: "28px", height: "28px" }} />}
                        />
                    ) : (
                        <BottomNavigationAction
                            key={page.label}
                            component={RouterLink}
                            to={page.path}
                            label={page.label}
                            value={page.path}
                            icon={page.icon}
                            sx={{ color: customTheme.palette.slate[200] }}
                        />
                    )
                ))}
            </BottomNavigation>
            <DialogBox open={open} handleClose={handleClose} />
        </>
    );
}