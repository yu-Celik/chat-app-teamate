import { Stack } from "@mui/material";
import customTheme from "../../styles/customTheme";
import { users } from "../../data/userData";
import MessageSend from "./MessageSend/MessageSend";
export default function ChatList() {

    const user = users[0];
    const user2 = users[1];
    return (
        <Stack direction={'column-reverse'} p={{ xs: 0.5, sm: 2, md: 3 }} maxHeight={'calc(100vh - 150px)'} sx={{
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
            <MessageSend user={user} />
            <MessageSend user={user2} />
            <MessageSend user={user} />
            <MessageSend user={user2} />
            <MessageSend user={user} />
            <MessageSend user={user2} />
            <MessageSend user={user} />
            <MessageSend user={user2} />
            <MessageSend user={user} />
            <MessageSend user={user2} />
            <MessageSend user={user} />
            <MessageSend user={user2} />
        </Stack>
    )
}

