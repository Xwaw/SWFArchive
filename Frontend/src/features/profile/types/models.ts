export type ProfileDto = {
    userId: string,
    userName: string,
    avatarUrl?: string,
    bannerUrl?: string,
    backgroundUrl: string,
    description: string
}

export type UserStatusDto = {
    userName: string,
    avatarUrl?: string,
    isOnline: boolean
}