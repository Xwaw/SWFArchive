export type ViewGame = {
  id: string,
  title: string,
  description: string,
  thumbnailUrl?: string,
  lastPlayed: Date
}

export type GameSession = {
  gameId: string,
  userId: string,
  swfUrl: string
}