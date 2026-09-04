export interface RankingGame {
  position: number;
  title: string;
  publisher: string;
  platform: string;
  genre: string;
  rightLabel: string;
  rightValue: string;
}

export const rankingGames: RankingGame[] = [
  { position: 2, title: "GAME TITLE: EXAMPLE GAME", publisher: "EXAMPLE", platform: "PC", genre: "Strategy", rightLabel: "release:", rightValue: "09/13/2003" },
  { position: 3, title: "GAME TITLE: EXAMPLE GAME", publisher: "EXAMPLE", platform: "XBOX", genre: "Role-Playing", rightLabel: "score:", rightValue: "9.1" },
  { position: 4, title: "GAME TITLE: EXAMPLE GAME", publisher: "EXAMPLE", platform: "PC", genre: "Action", rightLabel: "release:", rightValue: "Q4 2003" },
  { position: 5, title: "GAME TITLE: EXAMPLE GAME", publisher: "EXAMPLE", platform: "PC", genre: "Action", rightLabel: "release:", rightValue: "11/19/2003" },
  { position: 6, title: "GAME TITLE: EXAMPLE GAME", publisher: "EXAMPLE", platform: "PC", genre: "Simulation", rightLabel: "score:", rightValue: "8.8" },
  { position: 7, title: "GAME TITLE: EXAMPLE GAME", publisher: "EXAMPLE", platform: "XBOX", genre: "Sports", rightLabel: "release:", rightValue: "09/16/2003" },
  { position: 8, title: "GAME TITLE: EXAMPLE GAME", publisher: "EXAMPLE", platform: "GC", genre: "Action", rightLabel: "release:", rightValue: "10/15/2003" },
  { position: 9, title: "GAME TITLE: EXAMPLE GAME", publisher: "EXAMPLE", platform: "PS2", genre: "Sports", rightLabel: "release:", rightValue: "10/28/2003" },
  { position: 10, title: "GAME TITLE: EXAMPLE GAME", publisher: "EXAMPLE", platform: "PS2", genre: "Sports", rightLabel: "release:", rightValue: "08/13/2003" },
];
