import { Stack, Collapse, List, ListItemButton, ListItemIcon, ListItemText, SwipeableDrawer, Tab, Tabs, useMediaQuery } from "@mui/material";
import { ReactEventHandler, SyntheticEvent, useEffect, useRef, useState } from "react";
import { DrawerFooter, DrawerHeader } from "./stylesDrawers";
import customTheme from '../../../styles/customTheme';
import { GroupAdd, KeyboardArrowLeft, Search, ViewListOutlined, KeyboardArrowUp, KeyboardArrowDown, Close } from "@mui/icons-material";
import ProfileInDrawer from "../UserProfile/ProfileInDrawer";
import { useChat } from "../../../contexts/ChatContext/useChatContext";
import { Chat } from "../../../types/Chat.type/Chat.Props";
import { Reorder } from "framer-motion";
import { styleListDrawer } from "./styleListDrawer";
import MenuCreateChat from "../MenuCreateChat";
import { StyledIconButton } from "../../IconButton/IconButton";
import { TransitionGroup } from 'react-transition-group';
import { useNavigate } from "react-router-dom";


interface SwipeableMobileDrawerProps {
    anchor: Anchor;
    open: boolean;
    onClose: ReactEventHandler;
    onOpen: ReactEventHandler;
    children: React.ReactNode;
}
type Anchor = 'left';

const SwipeableMobileDrawer = ({ open, onClose, onOpen, children }: SwipeableMobileDrawerProps) => {
    const [value, setValue] = useState(0);
    const [showGroupe, setShowGroupe] = useState(false);
    const { chatInfo, updateChatOrder } = useChat();
    const [items, setItems] = useState([...chatInfo.userChats.chats]); // Initialisez items avec les chats de l'utilisateur
    const [isRearrangeMode, setIsRearrangeMode] = useState(false);
    const navigate = useNavigate();
    const handleChange = (_event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    // Référence à la liste pour contrôler le défilement
    const listRef = useRef<HTMLDivElement>(null);
    const isSmUp = useMediaQuery(customTheme.breakpoints.up('sm'));
    const scrollList = (direction: 'up' | 'down') => {
        if (listRef.current) {
            const currentScroll = listRef.current.scrollTop;
            const scrollAmount = 100;
            if (direction === 'up') {
                listRef.current.scrollTo({ top: currentScroll - scrollAmount, behavior: 'smooth' });
            } else {
                listRef.current.scrollTo({ top: currentScroll + scrollAmount, behavior: 'smooth' });
            }
        }
    };

    // Mettre à jour l'état lorsque les éléments sont réordonnés
    const handleReorder = (newOrder: Chat[]) => {
        setItems(newOrder);
        updateChatOrder(newOrder);
        localStorage.setItem('chatsOrder', JSON.stringify(newOrder.map(chat => chat._id)));
    };

    useEffect(() => {
        const storedOrder = localStorage.getItem('chatsOrder'); // On récupère l'ordre des chats stocké dans le localStorage
        const storedOrderIds = storedOrder ? JSON.parse(storedOrder) : []; // On récupère l'ordre des chats actuellement dans le drawer
        const currentChatIds = chatInfo.userChats.chats.map(chat => chat._id); // On récupère l'ordre des chats actuellement dans le drawer

        const arraysHaveSameElements = storedOrderIds.length === currentChatIds.length && // Si la taille des deux tableaux est la même
            storedOrderIds.every((id: string) => currentChatIds.includes(id)) && // Si tous les éléments de storedOrderIds sont dans currentChatIds
            currentChatIds.every((id: string) => storedOrderIds.includes(id)); // Si tous les éléments de currentChatIds sont dans storedOrderIds

        if (!arraysHaveSameElements) { // Si les deux tableaux n'ont pas les mêmes éléments
            setItems([...chatInfo.userChats.chats]); // On met à jour les chats
            return;
        }

        // Réordonnez les chats selon l'ordre stocké, s'il existe
        if (arraysHaveSameElements) { // Si les deux tableaux ont les mêmes éléments
            const reorderedChats = storedOrderIds.map((id: string) => chatInfo.userChats.chats.find(chat => chat._id === id)).filter((chat: Chat | undefined) => chat !== undefined); // On récupère les chats dans l'ordre stocké
            setItems(reorderedChats); // On met à jour les chats
        }
    }, [chatInfo.userChats.chats]);


    const list = () => (
        <Stack
            sx={{
                width: '100vw',
                height: '20dvh', // Hauteur par défaut
                '@media screen and (min-height: 200px)': {
                    height: '30dvh', // Hauteur pour les écrans de plus de 600px de haut
                },
                '@media screen and (min-height: 400px)': {
                    height: '55dvh', // Hauteur pour les écrans de plus de 600px de haut
                },
                '@media screen and (min-height: 600px)': {
                    height: '70dvh', // Hauteur pour les écrans de plus de 600px de haut
                },
                '@media screen and (min-height: 800px)': {
                    height: '80dvh', // Hauteur pour les écrans de plus de 600px de haut
                },
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
                        style={{ position: 'relative' }}
                        ref={listRef}

                    >
                        <Stack sx={{
                            position: 'fixed',
                            bottom: '15%',
                            zIndex: 1000,
                            right: isSmUp ? '-0%' : '-5%',
                            transform: 'translateX(-50%)',
                            backgroundColor: customTheme.palette.noirTransparent.dark,
                            borderRadius: customTheme.spacing(1),
                            padding: customTheme.spacing(1),
                        }}>
                            <StyledIconButton title="Défilement vers le haut" onClick={() => scrollList('up')}>
                                <KeyboardArrowUp />
                            </StyledIconButton>
                            <StyledIconButton title="Défilement vers le bas" onClick={() => scrollList('down')}>
                                <KeyboardArrowDown />
                            </StyledIconButton>
                        </Stack>
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
                                        key={item._id}
                                        chatId={item._id}
                                        lastMessageOfChat={chatInfo.lastMessageSeen.messages}
                                        username={item.members.find(member => member._id !== chatInfo.userChats.currentUser?._id)?.username}
                                        profilePic={item.members.find(member => member._id !== chatInfo.userChats.currentUser?._id)?.profilePic}
                                        userId={item.members.find(member => member._id !== chatInfo.userChats.currentUser?._id)?._id ?? ''}
                                        isLoadingUserChat={chatInfo.userChats?.isLoading}
                                        isLoadingCreateChat={chatInfo.createChat?.isLoading}
                                        isLoadingDeleteChat={chatInfo.deleteChat?.isLoading}
                                        lastLogout={item.members.find(member => member._id !== chatInfo.userChats.currentUser?._id)?.lastLogout}
                                        currentUserId={chatInfo.userChats.currentUser?._id}
                                        onlineUsers={chatInfo.onlineUsersIds}
                                        onClick={onClose}
                                    />
                                </Collapse>
                            ))}
                        </TransitionGroup>
                    </List>
                )
            }
        </Stack>
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
                <div>
                    <DrawerHeader>
                        <Tabs value={value} onChange={handleChange} aria-label="Chats" sx={{
                            '& .MuiTabs-flexContainer': {
                                justifyContent: 'flex-end',
                            },
                            '& .MuiTab-root': {
                                flexGrow: 1,
                            },
                            '& .MuiTabs-indicator': {
                                backgroundColor: customTheme.palette.orangePV.dark,
                            },
                        }}>
                            <Tab sx={{
                                '&.MuiTab-textColorPrimary': {
                                    color: customTheme.palette.slate[200],
                                    maxWidth: '100%',
                                    width: '50%',
                                },
                                '&.Mui-selected': {
                                    color: customTheme.palette.orangePV.dark,
                                },
                            }} label="Chat privé" onClick={() => setShowGroupe(false)} />
                            <Tab sx={{
                                '&.MuiTab-textColorPrimary': {
                                    color: customTheme.palette.slate[200],
                                    maxWidth: '100%',
                                    width: '50%',
                                },
                                '&.Mui-selected': {
                                    color: customTheme.palette.orangePV.dark,
                                },
                            }} label="Groupe" onClick={() => setShowGroupe(true)} />
                        </Tabs>
                        <Stack direction="row" justifyContent="space-between">
                            <StyledIconButton
                                title="Retour à la page d'accueil"
                                size="large"
                                aria-label="Retour à la page précedente"
                                aria-controls="nav-drawer"
                                aria-haspopup="true"
                                onClick={() => navigate(-1)}
                            >
                                <KeyboardArrowLeft />

                            </StyledIconButton>
                            <StyledIconButton
                                title="Fermer le menu"
                                size="large"
                                aria-label="Fermer le menu"
                                aria-controls="nav-drawer"
                                aria-haspopup="true"
                                onClick={onClose}
                            >
                                <Close />
                            </StyledIconButton>
                        </Stack>
                    </DrawerHeader>
                    {list()}
                </div>
                <DrawerFooter >
                    <List>
                        {showGroupe ? (
                            ['Creer un groupe', 'Rejoins un groupe'].map((text, index) => (
                                <ListItemButton key={text}>
                                    <ListItemIcon>
                                        {index % 2 === 0 ? <GroupAdd /> : <Search />}
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            ))
                        ) : (
                            <>
                                <MenuCreateChat />
                                <ListItemButton
                                    key="rearrange-button"
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
                            </>
                        )}
                    </List>
                </DrawerFooter>
            </SwipeableDrawer>
            {children}
        </>
    );
}

export default SwipeableMobileDrawer