import * as React from 'react';
import {
    Link as RouterLink,
} from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { AddBoxRounded, Mail, HomeRounded, SportsEsportsRounded, } from '@mui/icons-material';
import ImageAvatars from '../ImageAvatars/ImageAvatars';
import customTheme from './../../styles/customTheme.ts';
import { useLocation } from 'react-router-dom';
import DialogBox from '../DialoguePublication/DialoguePublication.tsx';


export default function LabelBottomNavigation() {

    const location = useLocation();
    const [valueNav, setValueNav] = React.useState(location.pathname.slice(1));
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    React.useEffect(() => {
        setValueNav(location.pathname.slice(1));
    }, [location]);

    const handleChangeNav = (_: React.SyntheticEvent, newValue: string) => {
        setValueNav(newValue);
    };

    return (
        <>
            <BottomNavigation // 
                sx={{
                    width: '100dvw',
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1000,
                    backgroundColor: customTheme.palette.bluePV.dark,
                    color: customTheme.palette.slate[200],
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
                <BottomNavigationAction //  Accueil
                    component={RouterLink}
                    to="/accueil"
                    label="Accueil"
                    value="accueil"
                    icon={<HomeRounded

                        sx={{
                            color: customTheme.palette.slate[200],
                            width: "28px",
                            height: "28px",



                        }}
                    />}
                />
                <BottomNavigationAction // Jouer
                    component={RouterLink}
                    to="/jouer"
                    label="jouer"
                    value="jouer"
                    icon={<SportsEsportsRounded
                        sx={{
                            color: customTheme.palette.slate[200],
                            width: "28px",
                            height: "28px",
                        }}
                    />}
                />
                <BottomNavigationAction // Ajouter une publication
                    onClick={handleClickOpen}
                    icon={<AddBoxRounded
                        sx={{
                            color: customTheme.palette.slate[200],
                            width: "28px",
                            height: "28px",
                        }}
                    />}
                />
                <BottomNavigationAction // Messages
                    component={RouterLink}
                    to="/test"
                    label="Messages"
                    value="test"
                    icon={<Mail
                        sx={{
                            color: customTheme.palette.slate[200],
                            width: "28px",
                            height: "28px",
                        }}
                    />}
                />
                <BottomNavigationAction // Profil
                    component={RouterLink}
                    to="/profil"
                    label="Profil"
                    value="profil"
                    icon={<ImageAvatars
                        sx={{
                            width: "26px",
                            height: "26px",
                        }}
                    />}
                />
            </BottomNavigation>
            <DialogBox open={open} handleClose={handleClose} />
        </>
    );
}


