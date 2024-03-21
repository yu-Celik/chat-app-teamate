import ChatHeader from "../components/Chats/ChatHeader";
import ChatBody from "../components/Chats/ChatBody";
import { PersistentDesktopDrawer, SwipeableMobileDrawer } from "../components/Chats/ChatDrawer";
import { useState } from "react";
import { useMediaQuery } from "@mui/material";
import customTheme from "../styles/customTheme";

export default function ChatPage() {
    const [open, setOpen] = useState(false);


    // const isSmUp = useMediaQuery(customTheme.breakpoints.up('sm'));
    const isMdUp = useMediaQuery(customTheme.breakpoints.up('md'));
    const isMdDown = useMediaQuery(customTheme.breakpoints.down('md'));

    return (
        <>
            {isMdUp &&
                <PersistentDesktopDrawer>
                    <ChatHeader onClickOpenDrawer={() => { setOpen(!open) }} />
                    <ChatBody />
                </PersistentDesktopDrawer>
            }
            {isMdDown &&
                <>
                    <SwipeableMobileDrawer anchor="left" open={open} onClose={() => setOpen(false)} onOpen={() => setOpen(true)} />
                    <ChatHeader onClickOpenDrawer={() => { setOpen(!open) }} />
                    <ChatBody />
                </>
            }
        </>
    )
}

