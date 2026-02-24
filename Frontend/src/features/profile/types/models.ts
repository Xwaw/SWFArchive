export type ProfileDto = {
    userId: string,
    userName: string,
    avatarUrl?: string,
    bannerUrl?: string,
    backgroundUrl: string,
    description: string
}

export type UserStatusDto = {
    userId: string,
    userName: string,
    avatarUrl?: string,
    isOnline: boolean,
    onAvatarClick?: () => void
}

export type AvatarButtonDto = {
    userId: string,
    avatarUrl?: string
    onClick?: () => void;
}