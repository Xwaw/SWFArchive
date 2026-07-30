import { useEffect, useState } from "react";
import { friendsService } from "../../friends/services/FriendsService";
import { chatService } from "../services/ChatService";
import type { MessageChat } from "../types";

export default function useChat(conversationId: string) {
    const [messages, setMessages] = useState<MessageChat[]>([]);

    const loadChatMessages = async () => {
        const messagesList = await friendsService.getMessages(conversationId);
        console.log("test: " + messagesList)

        setMessages(messagesList);
    };

    const sendMessage = async (text: string) => {
        await chatService.sendMessage(conversationId, text);
    };

    useEffect(() => {
        let unsubscribe: (() => void) | undefined;

        const setupChat = async () => {
            await chatService.connect();

            await chatService.joinChat(conversationId);

            await loadChatMessages();

            unsubscribe = chatService.onMessage((message) => {
                setMessages(prev => [...prev, message]);
            });
        };

        setupChat();

        return () => {
            unsubscribe?.();
            chatService.leaveChat(conversationId);
        };
    }, [conversationId]);

    return {
        messages,
        sendMessage
    };
}