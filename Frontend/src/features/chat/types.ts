export interface MessageChat{
    id: string,
    friendshipId: string,
    senderId: string,
    senderUsername: string,
    senderAvatarUrl: string,
    content: string,
    created: Date
}