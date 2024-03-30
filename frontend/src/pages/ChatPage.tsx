import ChatHeader from "../components/Chats/ChatHeader";
import ChatBody from "../components/Chats/ChatBody";
import { useCallback, useState } from "react";
import { useMediaQuery } from "@mui/material";
import customTheme from "../styles/customTheme";
import PersistentDesktopDrawer from "../components/Chats/ChatDrawer/PersistentDesktopDrawer";
import { SwipeableMobileDrawer } from "../components/Chats/ChatDrawer/SwipeableMobileDrawer";
import useGetAllUsers from "../hooks/Chat/useGetAllUsers";
import useUserChats from "../hooks/Chat/useUserChats";

export default function ChatPage() {
    const [open, setOpen] = useState(false);
    useGetAllUsers();
    useUserChats();



    const toggleDrawer = useCallback(() => {
        setOpen((prevOpen) => !prevOpen);
    }, []);
    // const isSmUp = useMediaQuery(customTheme.breakpoints.up('sm'));
    const isMdUp = useMediaQuery(customTheme.breakpoints.up('md'));
    const isMdDown = useMediaQuery(customTheme.breakpoints.down('md'));

    return (
        <>
            {isMdUp &&
                <PersistentDesktopDrawer>
                    <ChatHeader/>
                    <ChatBody />
                </PersistentDesktopDrawer>
            }
            {isMdDown &&
                <>
                    <SwipeableMobileDrawer anchor="left" open={open} onClose={toggleDrawer} onOpen={toggleDrawer} />
                    <ChatHeader onClickOpenDrawer={toggleDrawer} />
                    <ChatBody />
                </>
            }
        </>
    )
}

