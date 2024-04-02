import { Message } from "../../../types/Chat.type/Chat.Props";

export function getLastMessageSeen(messages: Message[], userId: string, deletedMessageId?: string): string {
    let userMessages = messages.filter((message) => message.senderId === userId);
    if (deletedMessageId) {
        userMessages = userMessages.filter(message => message._id !== deletedMessageId);
    }
    const lastUserMessage = userMessages[userMessages.length - 1];

    if (lastUserMessage) {
        return lastUserMessage.message;
    } else {
        return 'Commencer a chatter !';
    }
}