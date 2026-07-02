export type ViewGame = {
  id: string,
  title: string,
  description: string,
  thumbnailUrl?: string,
  hoursPlayed: number,
  lastPlayed: string
}

export type GameSession = {
  gameId: string,
  userId: string,
  swfUrl: string
}