import * as React from 'react';
import { Add } from '@mui/icons-material';
import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import customTheme from '../../styles/customTheme';
import { SearchBar } from '../SearchBar/SearchBar';
import { StyledMenu } from './ContextMenu/ContextMenu';
import { useChat } from '../../contexts/ChatContext/useChatContext';
import useCreateChat from '../../hooks/Chat/useCreateChat';
import ProfileInMenu from './UserProfile/ProfileInMenu';



export default function MenuCreateChat() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null); // ouverture du menu
  const open = Boolean(anchorEl);
  const [searchTerm, setSearchTerm] = React.useState('');
  const { chatInfo } = useChat();
  const { createChat } = useCreateChat();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  // React.useEffect(() => {
  //   console.log(chatInfo.potentialChats)
  // }, [chatInfo.potentialChats])

  const filteredChats = chatInfo.potentialChats.filter(chat =>
    chat.username?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCreateChat = async (userId: string) => {
    if (userId) {
      await createChat(userId);
      handleClose();
    }
  };

  return (
    <>
      <ListItem key="create-chat-button" disablePadding>
        <ListItemButton
          id="create-chat-button"
          aria-controls={open ? 'create-chat-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <ListItemIcon>
            <Add />
          </ListItemIcon>
          <ListItemText primary="Créer un chat" />
        </ListItemButton>
      </ListItem>
      <StyledMenu
        id="create-chat-menu"
        MenuListProps={{
          'aria-labelledby': 'create-chat-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >

        <Typography variant="body1" gutterBottom sx={{
          color: customTheme.palette.slate[200],
          fontWeight: 600,
          textAlign: 'center',
          padding: customTheme.spacing(1),
        }}>
          Créer un chat
        </Typography>
        <SearchBar placeholder='Rechercher un utilisateur' inputProps={{
          autoComplete: 'off',
          autoCorrect: 'off',
          autoCapitalize: 'off',
          value: searchTerm,
          onChange: handleChange,
        }}
        />
        <List disablePadding sx={{
          height: '300px',
          overflowY: 'auto',
          overflowX: 'hidden',
          scrollBehavior: 'smooth',
          '&::-webkit-scrollbar': {
            width: '0.25rem',
            height: '0.25rem',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: customTheme.palette.slate[500],
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'transparent',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: customTheme.palette.slate[600],
          },
        }}>
          {filteredChats.map((potentialChat) => (
            <React.Fragment key={potentialChat._id}>
              <ProfileInMenu
                username={potentialChat.username}
                profilePic={potentialChat.profilePic}
                onClick={() => handleCreateChat(potentialChat._id as string)}
                lastLogout={potentialChat.lastLogout}
                onlineUsers={chatInfo.onlineUsersIds}
                userId={potentialChat._id ?? ''}
              />
              <Divider variant='fullWidth'
                sx={{
                  backgroundColor: customTheme.palette.slate[200],
                }}
              />
            </React.Fragment>
          ))}
        </List>
      </StyledMenu>
    </ >
  );
}