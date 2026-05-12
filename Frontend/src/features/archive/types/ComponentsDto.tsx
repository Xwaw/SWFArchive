export type UploadGameFormState = {
  title: string;
  authorName: string;
  description: string;
  version: string;
  gameFile: File | null;
  thumbnail: File | null;
};

export type QuerySearch = {
  currentPage: number;
  search?: string;
  tagIds?: string;
  sortBy?: string;
}

export interface GameView {
  id: string;
  title: string;
  authorName: string;
  thumbnailUrl: string;
  description: string;
  starsRated: number;
  playsCount: number;
  uploaded: string;
  modified: string;
  tags: string[];
}