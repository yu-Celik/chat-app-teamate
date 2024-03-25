import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, SwipeableDrawer, Tab, Tabs } from "@mui/material";
import { ReactEventHandler, SyntheticEvent, useState } from "react";
import UserProfile from "../UserProfile/UserProfile";
import GroupeDisplay from "../GroupeDisplay/GroupeDisplay";
import { DrawerFooter, DrawerHeader } from "./stylesDrawers";
import customTheme from '../../../styles/customTheme';
import { Add, GroupAdd, Search } from "@mui/icons-material";
import { getLastMessageSeen } from "./getLastMessageSeen";
import { groupes, messages, users } from "../../../data/userData";

interface SwipeableMobileDrawerProps {
    anchor: Anchor;
    open: boolean;
    onClose: ReactEventHandler;
    onOpen: ReactEventHandler;
}
type Anchor = 'left';

export function SwipeableMobileDrawer({ open, onClose, onOpen }: SwipeableMobileDrawerProps) {
    const [showGroupe, setShowGroupe] = useState(true);
    const [value, setValue] = useState(0);

    const handleChange = (_event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    // const isMdUp = useMediaQuery(customTheme.breakpoints.up('md'));


    const list = () => (
        <Box
            sx={{
                width: '100vw',
                height: '100vh',

            }}
            role="ChatDrawer"
            onClick={onClose}
            onKeyDown={onClose}
        >
            {value === 0 ?
                users.map((user) => (
                    <UserProfile
                        key={user.id}
                        username={user.username}
                        profilePic={user.profilePic}
                        isOnline={user.isOnline}
                        lastSeen={user.lastSeen}
                        inHeader={false}
                        lastMessageSeen={getLastMessageSeen(messages, user.id)}
                        notifications={user.notifications}
                        lastNotificationSeen={user.lastNotificationSeen}
                    />
                )) :
                groupes.map((groupe) => (
                    <GroupeDisplay
                        key={groupe.id}
                        name={groupe.name}
                        members={groupe.members}
                        lastMessage={groupe.lastMessage.text}
                        lastNotificationSeen={groupe.lastNotificationSeen}
                        lastMessageSender={groupe.lastMessageSender}
                        profilePic={groupe.profilePic}
                        inHeader={false}
                        notifications={groupe.notifications}
                    />
                ))
            }
        </Box>
    );

    return (
        <>
            <SwipeableDrawer
                anchor={'left'}
                open={open}
                onClose={onClose}
                onOpen={onOpen}
                sx={{
                    '& .MuiDrawer-paper': {
                        backgroundImage: 'linear-gradient(to right, #0a3155, #172e60, #2e2966, #471d67, #5f0061)',
                    },
                    '& .MuiPaper-root': {
                        display: 'flex',
                        flexDirection: 'column',
                        backgroundColor: 'transparent',
                        justifyContent: 'space-between',
                    },
                }}
            >
                <DrawerHeader>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" sx={{
                        width: '100%',
                        '& .MuiTab-root': {
                            width: '50%',
                        },
                        '& .MuiTab-textColorPrimary': {
                            color: customTheme.palette.slate[200],
                        },
                        '& .css-1h9z7r5-MuiButtonBase-root-MuiTab-root.Mui-selected': {
                            color: customTheme.palette.orangePV.dark,
                        },
                        '& .MuiTabs-indicator': {
                            backgroundColor: customTheme.palette.orangePV.dark,
                        },
                    }}>
                        <Tab label="Chat privé" {...users} onClick={() => setShowGroupe(false)} />
                        <Tab label="Groupe" {...groupes} onClick={() => setShowGroupe(true)} />
                    </Tabs>
                </DrawerHeader>
                {list()}
                <DrawerFooter >
                    <List>
                        {showGroupe ? (
                            ['Creer un groupe', 'Rejoins un groupe'].map((text, index) => (
                                <ListItem key={text} disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            {index % 2 === 0 ? <GroupAdd /> : <Search />}
                                        </ListItemIcon>
                                        <ListItemText primary={text} />
                                    </ListItemButton>
                                </ListItem>
                            ))
                        ) : (
                            ['Creer un chat', 'Recherche un chat'].map((text, index) => (
                                <ListItem key={text} disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            {index % 2 === 0 ? <Add /> : <Search />}
                                        </ListItemIcon>
                                        <ListItemText primary={text} />
                                    </ListItemButton>
                                </ListItem>
                            ))
                        )}
                    </List>
                </DrawerFooter>
            </SwipeableDrawer>
        </>
    );
}