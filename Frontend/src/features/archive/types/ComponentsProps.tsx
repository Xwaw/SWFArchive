export interface GameCardProps{
    id: string,
    title: string,
    authorName: string,
    thumbnailUrl?: string,
    playsCount: number,
    ratingAverage: number,
    uploaded: string
}

export interface PaginatedArchive{
    items: GameCardProps[],
    total: number,
    page: number,
    pageSize: number
}

export interface ArchiveProps{
    children: GameCardProps[] | null
}

export interface GameViewProps{
    gameId?: string;
}