import { Box, Collapse, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Tab, Tabs, Typography, alpha } from "@mui/material";
import { ReactNode, SyntheticEvent, useEffect, useState } from "react";
import { DrawerFooter, DrawerHeader} from "./stylesDrawers";
import customTheme from '../../../styles/customTheme';
import { GroupAdd, Search, ViewListOutlined } from "@mui/icons-material";
import { useChat } from "../../../contexts/ChatContext/useChatContext";
import ProfileInDrawer from "../UserProfile/ProfileInDrawer";
import MenuCreateChat from "../MenuCreateChat";
import { Reorder } from "framer-motion";
import { Chat } from "../../../types/Chat.type/Chat.Props";
import { styleListDrawer } from "./styleListDrawer";
import './list-drawer-order.css';
import { TransitionGroup } from 'react-transition-group';
import { drawerWidth, heightHeader } from "../../../styles/customTheme";


const PersistentDesktopDrawer = ({ children }: { children: ReactNode }) => {
    const [value, setValue] = useState(0);
    const [showGroupe, setShowGroupe] = useState(false);
    const { chatInfo, updateChatOrder } = useChat();
    const [items, setItems] = useState([...chatInfo.userChats.chats]); // Initialisez items avec les chats de l'utilisateur
    const [isRearrangeMode, setIsRearrangeMode] = useState(false);

    // Mettre à jour l'état lorsque les éléments sont réordonnés
    const handleReorder = (newOrder: Chat[]) => {
        setItems(newOrder);
        updateChatOrder(newOrder);
        localStorage.setItem('chatsOrder', JSON.stringify(newOrder.map(chat => chat._id)));
    };

    const handleChange = (_event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    useEffect(() => {
        const storedOrder = localStorage.getItem('chatsOrder'); // On récupère l'ordre des chats stocké dans le localStorage
        const storedOrderIds = storedOrder ? JSON.parse(storedOrder) : []; // On récupère l'ordre des chats actuellement dans le drawer
        const currentChatIds = chatInfo.userChats.chats.map(chat => chat._id); // On récupère l'ordre des chats actuellement dans le drawer

        const arraysHaveSameElements = storedOrderIds.length === currentChatIds.length && // Si la taille des deux tableaux est la même
            storedOrderIds.every((id: string) => currentChatIds.includes(id)) && // Si tous les éléments de storedOrderIds sont dans currentChatIds
            currentChatIds.every((id: string) => storedOrderIds.includes(id)); // Si tous les éléments de currentChatIds sont dans storedOrderIds

        if (!arraysHaveSameElements) {
            setItems([...chatInfo.userChats.chats]);
            return;
        }

        // Réordonnez les chats selon l'ordre stocké, s'il existe
        if (arraysHaveSameElements) { // Si les deux tableaux ont les mêmes éléments
            const reorderedChats = storedOrderIds.map((id: string) => chatInfo.userChats.chats.find(chat => chat._id === id)).filter((chat: Chat | undefined) => chat !== undefined); // On récupère les chats dans l'ordre stocké
            setItems(reorderedChats); // On met à jour les chats
        }
    }, [chatInfo.userChats.chats]);

    // console.log(chatInfo.onlineUsersIds);

    return (
        <>
            <Box flexGrow={1} display={'flex'} sx={{
                height: 'calc(100dvh - 69.5px)',
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
                            flexGrow: 1,

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
                        <Tabs value={value} onChange={handleChange} aria-label="Chats" sx={{
                            width: '100%',
                            '& .MuiTabs-flexContainer': {
                                justifyContent: 'flex-end',
                            },
                            '& .MuiTab-root': {
                                flexGrow: 1,
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
                            <Tab label="Chat privé" onClick={() => setShowGroupe(false)} />
                            <Tab label="Groupe" onClick={() => setShowGroupe(true)} />
                        </Tabs>
                    </DrawerHeader>
                    {
                        isRearrangeMode ? (
                            <Reorder.Group
                                axis="y"
                                onReorder={handleReorder}
                                values={items}
                                className="list-drawer-order"

                            >
                                <TransitionGroup>
                                    {items.map((item) => (
                                        <Reorder.Item key={item._id} value={item}>
                                            <Collapse in={true}>
                                                <ProfileInDrawer
                                                    chatId={item._id}
                                                    username={item.members.find(member => member._id !== chatInfo.userChats.currentUser?._id)?.username}
                                                    profilePic={item.members.find(member => member._id !== chatInfo.userChats.currentUser?._id)?.profilePic}
                                                    isLoadingUserChat={chatInfo.userChats?.isLoading}
                                                    isLoadingCreateChat={chatInfo.createChat?.isLoading}
                                                    isLoadingDeleteChat={chatInfo.deleteChat?.isLoading}
                                                    lastLogout={item.members.find(member => member._id !== chatInfo.userChats.currentUser?._id)?.lastLogout}
                                                    lastMessageOfChat={chatInfo.lastMessageSeen.messages}
                                                    Reorder={true}
                                                    userId={item.members.find(member => member._id !== chatInfo.userChats.currentUser?._id)?._id ?? ''}
                                                    currentUserId={chatInfo.userChats.currentUser?._id}
                                                    onlineUsers={chatInfo.onlineUsersIds}
                                                />
                                            </Collapse>
                                        </Reorder.Item>
                                    ))}
                                </TransitionGroup>
                            </Reorder.Group>
                        ) : (
                            // Affichage normal sans possibilité de réordonnancement
                            <List
                                sx={{
                                    ...styleListDrawer,
                                }}>
                                <TransitionGroup>
                                    {items.map((item) => (
                                        <Collapse key={item._id}>
                                            <ProfileInDrawer
                                                chatId={item._id}
                                                lastMessageOfChat={chatInfo.lastMessageSeen.messages}
                                                username={item.members.find(member => member._id !== chatInfo.userChats.currentUser?._id)?.username}
                                                profilePic={item.members.find(member => member._id !== chatInfo.userChats.currentUser?._id)?.profilePic}
                                                userId={item.members.find(member => member._id !== chatInfo.userChats.currentUser?._id)?._id ?? ''}
                                                isLoadingUserChat={chatInfo.userChats?.isLoading}
                                                isLoadingCreateChat={chatInfo.createChat?.isLoading}
                                                isLoadingDeleteChat={chatInfo.deleteChat?.isLoading}
                                                currentUserId={chatInfo.userChats.currentUser?._id}
                                                onlineUsers={chatInfo.onlineUsersIds}
                                                lastLogout={item.members.find(member => member._id !== chatInfo.userChats.currentUser?._id)?.lastLogout}
                                            />
                                        </Collapse>
                                    ))}
                                </TransitionGroup>
                            </List>
                        )
                    }
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
                                <ListItem key="rearrange-button" disablePadding>
                                    <ListItemButton
                                        id="rearrange-button"
                                        aria-controls={isRearrangeMode ? 'Terminer le rangement' : 'Ranger les chats'}
                                        aria-haspopup="true"
                                        aria-expanded={isRearrangeMode ? 'true' : undefined}
                                        onClick={() => setIsRearrangeMode(!isRearrangeMode)}
                                    >
                                        <ListItemIcon>
                                            <ViewListOutlined />
                                        </ListItemIcon>
                                        <ListItemText primary={isRearrangeMode ? "Terminer le rangement" : "Ranger les chats"} />
                                    </ListItemButton>
                                </ListItem>
                            </>
                        )}
                    </DrawerFooter>
                </Drawer>
                <>
                    {chatInfo?.chatId != null ? children : (
                        <Stack flexGrow={1} alignItems={'center'} justifyContent={'center'} height={'100%'}>
                            <Typography variant="h6" sx={{ color: customTheme.palette.slate[300] }}>
                                Aucun chat selectionner
                            </Typography>
                        </Stack>
                    )}
                </>
            </Box >
        </>
    );
};

export default PersistentDesktopDrawer;