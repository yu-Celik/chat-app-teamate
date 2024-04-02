import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, SwipeableDrawer, Tab, Tabs } from "@mui/material";
import { ReactEventHandler, SyntheticEvent, useEffect, useState } from "react";
import { DrawerFooter, DrawerHeader } from "./stylesDrawers";
import customTheme from '../../../styles/customTheme';
import { GroupAdd, KeyboardArrowLeft, Search, ViewListOutlined } from "@mui/icons-material";
import { groupes, users } from "../../../data/userData";
import ProfileInDrawer from "../UserProfile/ProfileInDrawer";
import { useChat } from "../../../contexts/ChatContext/useChatContext";
import { Chat } from "../../../types/Chat.type/Chat.Props";
import { Reorder } from "framer-motion";
import { styleListDrawer } from "./styleListDrawer";
import MenuCreateChat from "../MenuCreateChat";
import { StyledIconButton } from "../../IconButton/IconButton";


interface SwipeableMobileDrawerProps {
    anchor: Anchor;
    open: boolean;
    onClose: ReactEventHandler;
    onOpen: ReactEventHandler;
}
type Anchor = 'left';

export function SwipeableMobileDrawer({ open, onClose, onOpen }: SwipeableMobileDrawerProps) {
    const [value, setValue] = useState(0);
    const [showGroupe, setShowGroupe] = useState(false);
    const { chatInfo, updateChatOrder } = useChat();
    const [items, setItems] = useState([...chatInfo.userChats.chats]); // Initialisez items avec les chats de l'utilisateur
    const [isRearrangeMode, setIsRearrangeMode] = useState(false);

    const handleChange = (_event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    // Mettre à jour l'état lorsque les éléments sont réordonnés
    const handleReorder = (newOrder: Chat[]) => {
        setItems(newOrder);
        updateChatOrder(newOrder);
        localStorage.setItem('chatsOrder', JSON.stringify(newOrder.map(chat => chat._id)));
    };

    useEffect(() => {
        const storedOrder = localStorage.getItem('chatsOrder');
        const storedOrderIds = storedOrder ? JSON.parse(storedOrder) : [];
        const currentChatIds = chatInfo.userChats.chats.map(chat => chat._id);

        const validStoredOrderIds = storedOrderIds.filter((id: string) => currentChatIds.includes(id));
        const chatIdsChanged = !storedOrderIds.every((id: string) => currentChatIds.includes(id)) || !currentChatIds.every((id: string) => storedOrderIds.includes(id));
        const hasChatIdsChanged = storedOrderIds.length !== currentChatIds.length;

        if (hasChatIdsChanged || chatIdsChanged) {
            setItems([...chatInfo.userChats.chats]);
            return;
        }

        // Réordonnez les chats selon l'ordre stocké, s'il existe
        if (validStoredOrderIds.length > 0) {
            const reorderedChats = validStoredOrderIds.map((id: string) => chatInfo.userChats.chats.find(chat => chat._id === id)).filter((chat: Chat | undefined) => chat !== undefined);
            setItems(reorderedChats);
        } else {
            // Si aucun ordre n'est stocké, utilisez l'ordre par défaut
            setItems([...chatInfo.userChats.chats]);
        }
    }, [chatInfo.userChats.chats]);


    const list = () => (
        <Box
            sx={{
                width: '100vw',
                height: '100vh',

            }}
            role="ChatDrawer"
            onKeyDown={onClose}
        >
            {
                isRearrangeMode ? (
                    <Reorder.Group
                        axis="y"
                        onReorder={handleReorder}
                        values={items}
                        className="list-drawer-order"

                    >
                        {items.map((item) => (
                            <Reorder.Item key={item._id} value={item}>
                                <ProfileInDrawer
                                            chatId={item._id}
                                            username={item.members.find(member => member._id !== chatInfo.userChats.currentUser?._id)?.username}
                                            profilePic={item.members.find(member => member._id !== chatInfo.userChats.currentUser?._id)?.profilePic}
                                            isLoadingUserChat={chatInfo.userChats?.isLoading}
                                            isLoadingCreateChat={chatInfo.createChat?.isLoading}
                                            isLoadingDeleteChat={chatInfo.deleteChat?.isLoading}
                                            lastLogin={item.members.find(member => member._id !== chatInfo.userChats.currentUser?._id)?.lastLogin}
                                            lastMessageOfChat={chatInfo.lastMessageSeen.messages}
                                            Reorder={true}
                                            userId={item.members.find(member => member._id !== chatInfo.userChats.currentUser?._id)?._id ?? ''}
                                            currentUserId={chatInfo.userChats.currentUser?._id}
                                            onlineUsers={chatInfo.onlineUsersIds}

                                />
                            </Reorder.Item>
                        ))}
                    </Reorder.Group>
                ) : (
                    // Affichage normal sans possibilité de réordonnancement
                    <List 
                        sx={{
                            ...styleListDrawer,
                        }}>
                        {items.map((item) => (
                            <ProfileInDrawer
                            key={item._id}
                            chatId={item._id}
                            lastMessageOfChat={chatInfo.lastMessageSeen.messages}
                            username={item.members.find(member => member._id !== chatInfo.userChats.currentUser?._id)?.username}
                            profilePic={item.members.find(member => member._id !== chatInfo.userChats.currentUser?._id)?.profilePic}
                            userId={item.members.find(member => member._id !== chatInfo.userChats.currentUser?._id)?._id ?? ''}
                            isLoadingUserChat={chatInfo.userChats?.isLoading}
                            isLoadingCreateChat={chatInfo.createChat?.isLoading}
                            isLoadingDeleteChat={chatInfo.deleteChat?.isLoading}
                            lastLogin={item.members.find(member => member._id !== chatInfo.userChats.currentUser?._id)?.lastLogin}
                            currentUserId={chatInfo.userChats.currentUser?._id}
                            onlineUsers={chatInfo.onlineUsersIds}
                            onClick={onClose}
                            />
                        ))}
                    </List>
                )
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
                        <Tab label="Chat privé" {...users} onClick={() => setShowGroupe(false)} />
                        <Tab label="Groupe" {...groupes} onClick={() => setShowGroupe(true)} />
                    </Tabs>
                    <StyledIconButton
                        title="Fermer le menu"
                        size="large"
                        aria-label="Fermer le menu"
                        aria-controls="nav-drawer"
                        aria-haspopup="true"
                        onClick={onClose}
                    >
                        <KeyboardArrowLeft />
                    </StyledIconButton>
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
                    </List>
                </DrawerFooter>
            </SwipeableDrawer>
        </>
    );
}