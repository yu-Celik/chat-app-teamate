import { Stack } from "@mui/material";
import ChatBar from "./MessageBar";
import MessageList from "./MessageList";
import { users } from "../../data/userData";
import { heightHeader } from "./ChatDrawer/stylesDrawers";

const heightHeaderChat = 71


export default function ChatBody() {
    return (
        <Stack flexGrow={1} height={`calc(100vh - ${heightHeader}px - ${heightHeaderChat}px)`} direction={'column'} justifyContent={'flex-end'}>
            <MessageList />
            <ChatBar username={users[0].username} />
        </Stack>
    )
}

