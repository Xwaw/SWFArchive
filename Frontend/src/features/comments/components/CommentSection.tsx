import { useEffect, useState } from "react";
import CommentMessage from "./CommentMessage";
import { useComments } from "../hooks/UseComments";
import type { CommentDto } from "../types/models";
import CommentView from "./CommentView";
import LoadingIndicator from "../../../components/LoadingIndicator";
import { useAuth } from "../../authorization/hooks/UseAuth";
import "./comments.css";

export default function CommentSection({
  targetId,
  targetType,
}: {
  targetId?: string;
  targetType: number;
}) {
  const {
    addComment,
    editComment,
    deleteComment,
    isSending,
    getComments,
    error,
  } = useComments(targetId ?? "", targetType);
  const { user } = useAuth();
  const [comments, setComments] = useState<CommentDto[]>([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (!targetId) return;
    let active = true;
    setLoaded(false);
    setComments([]);
    void getComments().then((data) => {
      if (active) {
        setComments(data ?? []);
        setLoaded(true);
      }
    });
    return () => {
      active = false;
    };
  }, [targetId, targetType]);
  const refresh = async () => {
    const data = await getComments();
    if (data) setComments(data);
  };
  const handleAdd = async (text: string) => {
    if (!(await addComment(text))) return false;
    await refresh();
    return true;
  };
  const handleEdit = async (id: string, text: string) => {
    if (!(await editComment(id, text))) return false;
    await refresh();
    return true;
  };
  const handleDelete = async (id: string) => {
    if (!(await deleteComment(id))) return false;
    await refresh();
    return true;
  };
  if (!targetId) return <p>No comments.</p>;
  return (
    <div className="comments-section">
      <CommentMessage onSubmit={handleAdd} disabled={!user || isSending} />
      {error && (
        <p className="comment-error" role="alert">
          {error}
        </p>
      )}
      {loaded && !error && comments.length === 0 && (
        <p className="comment-empty">
          No comments yet. Be the first to share your thoughts.
        </p>
      )}
      {comments.map((comment) => (
        <CommentView
          key={comment.commentId}
          comment={comment}
          disabled={isSending}
          onUpdate={handleEdit}
          onDelete={handleDelete}
        />
      ))}
      {isSending && <LoadingIndicator size={64} showLabel label="Loading..." />}
    </div>
  );
}
