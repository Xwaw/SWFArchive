export interface LibraryItemProps {
  id: string;
  title: string;
  thumbnail?: string;
}

export interface PaginationItemProps<T> {
  items: T[],
  total: 10,
  page: 1
}