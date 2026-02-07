export interface CommentDto {
  commentId: string;
  text: string;
  createdAt: string;
  updatedAt: string;
  isOwner: boolean;
  author: string;
  avatarUrl?: string;
}
