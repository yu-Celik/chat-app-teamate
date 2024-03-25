import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Menu, { MenuProps } from '@mui/material/Menu';

import Divider from '@mui/material/Divider';

import { Add } from '@mui/icons-material';
import { ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import customTheme from '../../styles/customTheme';
import { SearchBar } from '../SearchBar/SearchBar';
import UserProfile from './UserProfile/UserProfile';
import { User } from '../../types/Auth.type/Auth.Props';

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(() => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: customTheme.spacing(1),
    minWidth: 180,
    color: customTheme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : customTheme.palette.slate[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    backgroundColor: customTheme.palette.bluePV.dark,
    '& .MuiMenu-list': {
      padding: '4px 0',
      '& .MuiTypography-root': {
        color: customTheme.palette.slate[200],
      }
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: customTheme.palette.text.secondary,
        marginRight: customTheme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          customTheme.palette.slate[300],
          customTheme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

export default function MenuCreateChat({ potentialChats, createChat }: { potentialChats: User[], createChat: (userId: string) => void }) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null); // ouverture du menu
  const open = Boolean(anchorEl);


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
        <SearchBar placeholder='Rechercher un utilisateur' />
        <Divider sx={{ my: 0.5 }} />
        {potentialChats?.map((potentialChat) => (
          <ListItem key={potentialChat._id} disablePadding onClick={() => {
            handleClose(),
              createChat(potentialChat._id as string)
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