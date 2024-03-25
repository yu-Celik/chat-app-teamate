import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Tab, Tabs, alpha } from "@mui/material";
import { ReactNode, SyntheticEvent, useState } from "react";
import UserProfile from "../UserProfile/UserProfile";
import GroupeDisplay from "../GroupeDisplay/GroupeDisplay";
import { DrawerFooter, DrawerHeader, drawerWidth, heightHeader } from "./stylesDrawers";
import customTheme from '../../../styles/customTheme';
import { GroupAdd, Search } from "@mui/icons-material";
import { groupes, users } from "../../../data/userData";
import useCreateChat from "../../../hooks/Chat/useCreateChat";
import { UserChats } from "../../../types/Chat.type/Chat.Props";
import useGetAllUsers from "../../../hooks/Chat/usePotentialChats";
import MenuCreateChat from "../MenuCreateChat";


const PersistentDesktopDrawer = ({ children, userChats, refreshChats }: { children: ReactNode, userChats: UserChats, refreshChats: () => void }) => {
    const [value, setValue] = useState(0);
    const [showGroupe, setShowGroupe] = useState(false);
    const { createChat } = useCreateChat({ refreshChats })
    const { usersState } = useGetAllUsers()
    
    
    const potentialChats = usersState.users.filter((user) => !userChats.secondUsers.some(u => u._id === user._id))


    const handleChange = (_event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    // const isSmUp = useMediaQuery(customTheme.breakpoints.up('sm'));
    // const isMdUp = useMediaQuery(customTheme.breakpoints.up('md'));

    return (
        <>
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
                            (
                                userChats.secondUsers.map((secondUser) => (
                                    <UserProfile
                                        key={secondUser._id}
                                        username={secondUser.username}
                                        profilePic={secondUser.profilePic}
                                        inHeader={false}
                                        isLoading={userChats.isLoading}
                                    />
                                ))) :
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
                            <>
                                <MenuCreateChat potentialChats={potentialChats} createChat={createChat} />
                                <ListItem key="Rechercher un chat" disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <Search />
                                        </ListItemIcon>
                                        <ListItemText primary="Rechercher un chat" />
                                    </ListItemButton>
                                </ListItem>
                            </>
                        )}
                    </DrawerFooter>
                </Drawer>
                <Box flexGrow={1} height={'100%'}>
                    {children}
                </Box>
            </Box>
        </>
    );
};

export default PersistentDesktopDrawer;
