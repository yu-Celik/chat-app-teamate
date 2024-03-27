import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Tab, Tabs, Typography, alpha } from "@mui/material";
import { ReactNode, SyntheticEvent, useState } from "react";
import { DrawerFooter, DrawerHeader, drawerWidth, heightHeader } from "./stylesDrawers";
import customTheme from '../../../styles/customTheme';
import { GroupAdd, Search } from "@mui/icons-material";
import { groupes, users } from "../../../data/userData";
import { useChat } from "../../../contexts/ChatContext/useChatContext";
import ProfileInDrawer from "../UserProfile/ProfileInDrawer";
import GroupeDisplay from "../GroupeDisplay/GroupeDisplay";
import MenuCreateChat from "../MenuCreateChat";


const PersistentDesktopDrawer = ({ children }: { children: ReactNode }) => {
    const [value, setValue] = useState(0);
    const [showGroupe, setShowGroupe] = useState(false);
    const { chatInfo } = useChat();

    // console.log(deleteChatState.isLoading);
    // console.log(newChat.isLoading);


    const handleChange = (_event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };


    return (
        <>
            <Box flexGrow={1} display={'flex'} sx={{
                height: 'calc(100vh - 69.5px)',
                overflow: 'hidden',
                border: 'none',
            }}>
                <Drawer


                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        position: 'relative',
                        border: 'none',
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
                            border: 'none',

                            '&::-webkit-scrollbar': {
                                display: 'none',
                            }

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
                                minHeight: '67.5px',
                            },
                            '& .MuiTab-textColorPrimary': {
                                color: customTheme.palette.slate[200],
                            },
                            '& .css-1h9z7r5-MuiButtonBase-root-MuiTab-root.Mui-selected': {
                                color: customTheme.palette.orangePV.dark,
                            },
                            '& .MuiTabs-indicator': {
                                bottom: '',
                                backgroundColor: customTheme.palette.orangePV.dark,
                            },
                        }}>
                            <Tab label="Chat privé" {...users} onClick={() => setShowGroupe(false)} />
                            <Tab label="Groupe" {...groupes} onClick={() => setShowGroupe(true)} />
                        </Tabs>
                    </DrawerHeader>
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
                                chatInfo.userChats.chats?.map((chat) => (
                                    <ProfileInDrawer
                                        key={chat._id}
                                        chatId={chat._id}
                                        username={chat.members[1].username}
                                        profilePic={chat.members[1].profilePic}
                                        isLoadingUserChat={chatInfo.userChats?.isLoading}
                                        isLoadingCreateChat={chatInfo.createChat?.isLoading}
                                        isLoadingDeleteChat={chatInfo.deleteChat?.isLoading}
                                        lastLogin={chat.members[1].lastLogin}
                                    />
                                    // <p>{chat.members[1].username}</p>
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
                                <MenuCreateChat />
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
                    {chatInfo?.chatId != null ? children : (
                        <Stack flexGrow={1} alignItems={'center'} justifyContent={'center'} height={'100%'}>
                            <Typography variant="h6" sx={{ color: customTheme.palette.slate[300] }}>
                                Aucun chat selectionner
                            </Typography>
                        </Stack>
                    )}
                </Box>
            </Box>
        </>
    );
};

export default PersistentDesktopDrawer;
