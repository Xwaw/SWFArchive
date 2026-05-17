export interface LibraryItemProps {
  id: string;
  title: string;
  thumbnail?: string;
  onSelect: (id: string) => void;
}

export interface PaginationItemProps<T> {
  items: T[],
  total: 10,
  page: 1
}

export interface ViewGameLibraryProps{
  gameId: string;
}