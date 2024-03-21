import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';

import List from '@mui/material/List';
import Divider from '@mui/material/Divider';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';

import ListItemText from '@mui/material/ListItemText';

import { SwipeableDrawer, Tab, Tabs, Box } from '@mui/material';
import UserProfile from './UserProfile/UserProfile';
import { groupes, messages, users } from '../../data/userData';
import customTheme from '../../styles/customTheme';
import GroupeDisplay from './GroupeDisplay/GroupeDisplay';
import { GroupAdd, Search, Add } from '@mui/icons-material';
import { ListItemIcon } from '@mui/material';

const drawerWidth = 360;
const heightHeader = 69.5;




const DrawerHeader = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    ...customTheme.mixins.toolbar,
    justifyContent: 'flex-start',
}));

const DrawerFooter = styled(Box)(() => ({
    '& .MuiListItem-root': {
        color: customTheme.palette.slate[200],
    },
    '& .MuiSvgIcon-root': {
        color: customTheme.palette.slate[200],
    },
    '& .MuiTypography-root': {
        padding: customTheme.spacing(0, 2),
    },
    '& .MuiListItemIcon-root': {
        minWidth: 'fit-content',
    },
    [customTheme.breakpoints.down('md')]: {
        '& .MuiList-root': {
            display: 'flex',
            flexGrow: 1,
            padding: customTheme.spacing(0),
        },
        '& .MuiListItem-root': {
            flexDirection: 'column',
            flexGrow: 1,
        },
        '& .MuiButtonBase-root': {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            flexGrow: 1,
        },
    },
    [customTheme.breakpoints.down(400)]: {
        '& .MuiButtonBase-root': {
            padding: customTheme.spacing(1, 0),
        },
    },
    [customTheme.breakpoints.down(330)]: {
        '& .MuiListItem-root': {
            flexDirection: 'row',
            flexGrow: 0,
        },
        '& .MuiButtonBase-root': {
            margin: 'auto',
            flexDirection: 'row',
        },
        '& .MuiListItemText-root': {
            margin: 'auto',
            width: 'fit-content',
        },
        '& .MuiTypography-root': {
            padding: customTheme.spacing(0),
            width: 'fit-content',
            textAlign: 'center',
        },
        '& .MuiListItemIcon-root': {
            padding: customTheme.spacing(0, 1),
        },
    },

    '& .css-16ac5r2-MuiButtonBase-root-MuiListItemButton-root': {

    },



}));



function getLastMessageSeen(userId: number): string {
    const userMessages = messages.filter((message) => message.senderId === userId);
    const lastUserMessage = userMessages[userMessages.length - 1];

    if (lastUserMessage) {
        return lastUserMessage.text;
    } else {
        return 'Commencer a chatter !';
    }
}

export function PersistentDesktopDrawer({ children }: { children: React.ReactNode }) {
    const [value, setValue] = React.useState(0);
    const [showGroupe, setShowGroupe] = React.useState(true);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    // const isSmUp = useMediaQuery(customTheme.breakpoints.up('sm'));
    // const isMdUp = useMediaQuery(customTheme.breakpoints.up('md'));
    return (
        <Box flexGrow={1} display={'flex'} sx={{
            height: 'calc(100vh - 69.5px)',
            overflow: 'hidden',
        }}>
            <Drawer


                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    position: 'relative',
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        height: `calc(100% - ${heightHeader}px)`,
                        marginTop: `${heightHeader}px`,
                        backgroundColor: alpha(customTheme.palette.slate[800], 0.2),
                        borderColor: 'rgba(255, 255, 255, 0.0)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        '&::-webkit-scrollbar': {
                            width: '0.5rem',
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
                    },
                    '& .MuiDivider-root': {
                        backgroundColor: customTheme.palette.slate[500],
                    },
                }}
                variant="persistent"
                anchor="left"
                open={true}
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
                <Divider />
                <List sx={{
                    height: '80%',
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
                    {value === 0 ?
                        users.map((user) => (
                            <UserProfile
                                key={user.id}
                                username={user.username}
                                profilePic={user.profilePic}
                                isOnline={user.isOnline}
                                lastSeen={user.lastSeen}
                                inHeader={false}
                                lastMessageSeen={getLastMessageSeen(user.id)}
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
                </List>
                <Divider />
                <DrawerFooter >
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
                </DrawerFooter>
            </Drawer>
            <Box flexGrow={1} height={'100%'}>
                {children}
            </Box>
        </Box>
    );
}



type Anchor = 'left';

interface SwipeableMobileDrawerProps {
    anchor: Anchor; // Position du menu
    open: boolean; // Etat du menu
    onClose: (event: React.KeyboardEvent | React.MouseEvent) => void; // Fonction de fermeture du menu
    onOpen: (event: React.KeyboardEvent | React.MouseEvent) => void; // Fonction d'ouverture du menu
}



export function SwipeableMobileDrawer(props: SwipeableMobileDrawerProps) {
    const { open, onClose, onOpen } = props;
    const [showGroupe, setShowGroupe] = React.useState(true);
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
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
                        lastMessageSeen={getLastMessageSeen(user.id)}
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