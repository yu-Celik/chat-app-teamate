import { Message } from "../../../data/userData";

export function getLastMessageSeen(messages: Message[], userId: number): string {
    const userMessages = messages.filter((message) => message.senderId === userId);
    const lastUserMessage = userMessages[userMessages.length - 1];

    if (lastUserMessage) {
        return lastUserMessage.text;
    } else {
        return 'Commencer a chatter !';
    }
}
