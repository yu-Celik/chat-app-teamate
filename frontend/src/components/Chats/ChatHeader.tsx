import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { AppBar } from '@mui/material';
import customTheme from '../../styles/customTheme';

import { SearchIconOnly } from '../SearchBar/SearchIconOnly';
import { SearchBarInDialog } from '../SearchBar/SearchBarInDialog';
import { StyledIconButton } from '../IconButton/IconButton';
import { KeyboardArrowRight } from '@mui/icons-material';

import UserProfile from './UserProfile/UserProfile';
import GroupeDisplay from './GroupeDisplay/GroupeDisplay';
import { users, groupes } from '../../data/userData';








export default function SearchAppBar({ onClickOpenDrawer }: { onClickOpenDrawer: () => void }) {

    const usersSelected = false;

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="relative" sx={{
                backgroundColor: alpha(customTheme.palette.slate[800], 0.2),
                boxShadow: 'none',
                borderColor: 'rgba(255, 255, 255, 0.0)',
                borderBottom: `2px solid ${customTheme.palette.orangePV.light}`
            }}>
                <Toolbar>
                    <StyledIconButton
                        title="Ouvrir le menu"
                        size="large"
                        aria-label="show more"
                        aria-controls="nav-drawer"
                        aria-haspopup="true"
                        onClick={onClickOpenDrawer}
                        sx={{
                            display: { xs: 'flex', md: 'none' }
                        }}
                    >
                        <KeyboardArrowRight />
                    </StyledIconButton>
                    {usersSelected ? (
                        <UserProfile username={users[0].username} profilePic={users[0].profilePic} isOnline={users[0].isOnline} lastSeen={users[0].lastSeen} inHeader={true} />) :
                        (<GroupeDisplay name={groupes[0].name} members={groupes[0].members} lastMessage={groupes[0].lastMessage.text} lastMessageSender={groupes[0].lastMessageSender} profilePic={groupes[0].profilePic} inHeader={true} lastNotificationSeen={groupes[0].lastNotificationSeen} notifications={groupes[0].notifications} />)
                    }
                    < SearchIconOnly onClick={handleOpen} />
                </Toolbar>
            </AppBar>
            <SearchBarInDialog
                placeholder="Rechercher un message"
                inputProps={{ 'aria-label': 'search' }}
                onClose={handleClose}
                open={open}
            ></SearchBarInDialog>
        </Box>
    );
}