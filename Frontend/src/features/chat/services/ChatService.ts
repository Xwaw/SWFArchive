import { HubConnection, HubConnectionBuilder, HubConnectionState } from "@microsoft/signalr";
import type { MessageChat } from "../types";
import { Config } from "../../../Config";

class ChatService{
    private connection: HubConnection;

    constructor(){
        this.connection = new HubConnectionBuilder()
        .withUrl(Config.API_URL + "/chatHub")
        .withAutomaticReconnect()
        .build()
    }

    async connect(){
        if(this.connection.state === HubConnectionState.Disconnected)
            await this.connection.start();
    }

    async joinChat(conversationId: string) {
        console.log("conversationId:", conversationId);
        console.log(typeof conversationId);

        await this.connection.invoke("JoinChatRoom", conversationId);
    }
    
    async leaveChat(conversationId: string){
        await this.connection.invoke("LeaveChatRoom", conversationId)
    }

    async sendMessage(conversationId: string, text: string){
        await this.connection.invoke("SendMessage", conversationId, text)
    }

    onMessage(callback: (message: MessageChat) => void) {
        this.connection.on("ReceiveMessage", (...args) => {
            console.log("ReceiveMessage args:", args);

            callback(args[0]);
        });

        return () => {
            this.connection.off("ReceiveMessage");
        };
    }
}

export const chatService = new ChatService();