export interface ItemView{
    ThumbnailUrl: string,
    RateStars: number,
    NavigateOnClick: string;
}

export interface EditFormProps{
    Description: string,
    ImageUrl?: string,
    OnSave: (file: File) => Promise<void> | void;
}

export interface UserInfoProps{
    createdAt?: string,
    hoursTotal?: number,
    followers?: number,
    uploaded?: number
}