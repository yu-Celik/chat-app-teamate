import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import { AppBar, useMediaQuery } from '@mui/material';
import customTheme from '../../styles/customTheme';
import { SearchIconOnly } from '../SearchBar/SearchIconOnly';
import { SearchBarInDialog } from '../SearchBar/SearchBarInDialog';
import { StyledIconButton } from '../IconButton/IconButton';
import { KeyboardArrowRight } from '@mui/icons-material';
import ProfileInHeader from './UserProfile/ProfileInHeader';
import { useChat } from '../../contexts/ChatContext/useChatContext';
import { DrawerHeader } from './ChatDrawer/stylesDrawers';

export default function ChatHeader({ onClickOpenDrawer }: { onClickOpenDrawer?: () => void }) {
    const { chatInfo } = useChat();
    const [open, setOpen] = React.useState(false);

    const selectedChat = chatInfo.userChats.chats?.find(chat => chat._id === chatInfo.chatId);
    const isMdDown = useMediaQuery(customTheme.breakpoints.down('md'));

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // Trouvez un membre qui n'est pas l'utilisateur actuel
    const nonCurrentUserMember = selectedChat?.members.find(member => member._id !== chatInfo.userChats.currentUser?._id);

    return (
        <>
            {(selectedChat != null || isMdDown) && <DrawerHeader>
                <AppBar position="relative" sx={{
                    backgroundColor: alpha(customTheme.palette.slate[800], 0.2),
                    boxShadow: 'none',
                    borderColor: 'rgba(255, 255, 255, 0.0)',
                }}>
                    <Toolbar sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
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
                        {selectedChat != null && nonCurrentUserMember != null && <ProfileInHeader
                            userId={nonCurrentUserMember._id ?? ''}
                            username={nonCurrentUserMember.username}
                            profilePic={nonCurrentUserMember.profilePic}
                            lastLogout={nonCurrentUserMember.lastLogout}
                            onlineUsers={chatInfo.onlineUsersIds}
                        />}
                        {selectedChat != null && <SearchIconOnly onClick={handleOpen} />}
                    </Toolbar>
                </AppBar>
                <SearchBarInDialog
                    placeholder="Rechercher un message"
                    inputProps={{ 'aria-label': 'search' }}
                    onClose={handleClose}
                    open={open}
                />
            </DrawerHeader>}
        </>
    );
}