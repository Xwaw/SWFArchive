import { useEffect, useState } from "react";
import CommentMessage from "./CommentMessage";
import { useComments } from "../hooks/UseComments";
import type { CommentDto } from "../types/models";
import CommentView from "./CommentView";

export default function CommentSection({
  targetId,
  targetType,
}: {
  targetId?: string;
  targetType: number;
}) {
  if(!targetId){
    return(
      <div>
        No Comments
      </div>
    )
  }

  const { addComment, editComment, deleteComment, isSending, getComments } =
    useComments(targetId!, targetType);

  const [comments, setComments] = useState<CommentDto[]>([]);

  useEffect(() => {
    const load = async () => {
      const data = await getComments();
      setComments(data);
    };

    load();
  }, [targetId, targetType]);

  const refreshComments = async () => {
    const data = await getComments();
    setComments(data);
  };

  const handleAdd = async (text: string) => {
    await addComment(text);
    refreshComments();
  };

  const handleEdit = async (id: string, text: string) => {
    await editComment(id, text);
    await getComments();
    refreshComments();
  };

  const handleDelete = async (id: string) => {
    await deleteComment(id);
    await getComments();
    refreshComments();
  };

  return (
    <>
      <CommentMessage onSubmit={handleAdd} className="w-full" />

      {comments.map((comment) => (
        <div key={comment.commentId}>
          <CommentView
            comment={comment}
            onUpdate={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      ))}

      {isSending && <p>Sending comment...</p>}
    </>
  );
}
