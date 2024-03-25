import * as React from 'react';
import { Add } from '@mui/icons-material';
import { ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import customTheme from '../../styles/customTheme';
import { SearchBar } from '../SearchBar/SearchBar';
import UserProfile from './UserProfile/UserProfile';
import { User } from '../../types/Auth.type/Auth.Props';
import { StyledMenu } from './ContextMenu/ContextMenu';



export default function MenuCreateChat({ potentialChats, onClick }: { potentialChats: User[], onClick: (id: string) => void }) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null); // ouverture du menu
  const open = Boolean(anchorEl);
  const [searchTerm, setSearchTerm] = React.useState('');


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredChats = potentialChats.filter(chat =>
    chat.username?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <div>
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
          autoFocus: true,
          autoComplete: 'off',
          autoCorrect: 'off',
          autoCapitalize: 'off',
          value: searchTerm,
          onChange: handleChange,
        }} />
        {filteredChats.map((potentialChat) => (
          <ListItem key={potentialChat._id} disablePadding onClick={() => {
            onClick(potentialChat._id as string);
            handleClose()
          }}>
            <UserProfile
              inHeader={false}
              key={potentialChat._id}
              username={potentialChat.username}
              profilePic={potentialChat.profilePic}
            />
          </ListItem>
        ))}
      </StyledMenu>
    </div >
  );
}