import * as React from 'react';
import {
    Link as RouterLink,
} from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { AddBoxRounded, Mail, HomeRounded, SportsEsportsRounded, } from '@mui/icons-material';
import ImageAvatars from '../ImageAvatars/ImageAvatars';
import { users } from './../../data/userData.ts';
import customTheme from './../../styles/customTheme.ts';
import { useLocation } from 'react-router-dom';
import DialogBox from '../DialoguePublication/DialoguePublication.tsx';


export default function LabelBottomNavigation() {

    const location = useLocation();
    const [value, setValue] = React.useState(location.pathname.slice(1));
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    React.useEffect(() => {
        setValue(location.pathname.slice(1));
    }, [location]);

    const handleChange = (_: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <>
            <BottomNavigation
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
                value={value}
                onChange={handleChange}
            >
                <BottomNavigationAction
                    component={RouterLink}
                    to="/Accueil"
                    label="Accueil"
                    value="Accueil"
                    icon={<HomeRounded

                        sx={{
                            color: customTheme.palette.slate[200],
                            width: "28px",
                            height: "28px",

                        }}
                    />}
                />
                <BottomNavigationAction
                    component={RouterLink}
                    to="/Game"
                    label="jouer"
                    value="Game"
                    icon={<SportsEsportsRounded
                        sx={{
                            color: customTheme.palette.slate[200],
                            width: "28px",
                            height: "28px",
                        }}
                    />}
                />
                <BottomNavigationAction
                    onClick={handleClickOpen}
                    icon={<AddBoxRounded
                        sx={{
                            color: customTheme.palette.slate[200],
                            width: "28px",
                            height: "28px",
                        }}
                    />}
                />
                <BottomNavigationAction
                    component={RouterLink}
                    to="/Chat"
                    label="Messages"
                    value="Chat"
                    icon={<Mail
                        sx={{
                            color: customTheme.palette.slate[200],
                            width: "28px",
                            height: "28px",
                        }}
                    />}
                />
                <BottomNavigationAction
                    component={RouterLink}
                    to="/Profil"
                    label="Profil"
                    value="Profil"
                    icon={<ImageAvatars
                        username={users[0].username}
                        profilePic={users[0].profilePic}
                        sx={{
                            width: "28px",
                            height: "28px",
                        }}
                    />}
                />
            </BottomNavigation>
            <DialogBox  open={open} handleClose={handleClose} />
        </>
    );
}


