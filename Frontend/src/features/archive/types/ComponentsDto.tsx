export type UploadGameFormState = {
  title: string;
  authorName: string;
  description: string;
  version: string;
  gameFile: File | null;
  thumbnail: File | null;
};