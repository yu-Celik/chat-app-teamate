import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { AppBar, useMediaQuery } from '@mui/material';
import customTheme from '../../styles/customTheme';
import { SearchIconOnly } from '../SearchBar/SearchIconOnly';
import { SearchBarInDialog } from '../SearchBar/SearchBarInDialog';
import { StyledIconButton } from '../IconButton/IconButton';
import { KeyboardArrowRight } from '@mui/icons-material';
import ProfileInHeader from './UserProfile/ProfileInHeader';
import { useChat } from '../../contexts/ChatContext/useChatContext';

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
    return (
        <>
            {(selectedChat != null || isMdDown) && <Box sx={{ flexGrow: 1 }}>
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
                        {selectedChat != null && <ProfileInHeader
                            userId={selectedChat.members.find(member => member._id !== chatInfo.userChats.currentUser?._id)?._id ?? ''}
                            username={selectedChat?.members.find(member => member._id !== chatInfo.userChats.currentUser?._id)?.username}
                            profilePic={selectedChat?.members.find(member => member._id !== chatInfo.userChats.currentUser?._id)?.profilePic}
                            lastLogin={selectedChat?.members.find(member => member._id !== chatInfo.userChats.currentUser?._id)?.lastLogin}
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
            </Box>}
        </>
    );
}