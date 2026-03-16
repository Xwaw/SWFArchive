export interface GameCardProps{
    id: string,
    title: string,
    authorName: string,
    thumbnailUrl?: string,
    playsCount: number,
    starsRated: number,
    uploadedAt: string
}

export interface ArchiveProps{
    children: GameCardProps[]
}