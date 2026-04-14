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
  tagIds?: string[];
  sortBy?: string;
}