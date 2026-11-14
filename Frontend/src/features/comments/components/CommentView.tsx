import { useState } from "react";
import Button from "../../../components/Buttons/Button";
import { Config } from "../../../Config";
import type { CommentDto } from "../types/models";
interface Props {
  className?: string;
  comment: CommentDto;
  disabled?: boolean;
  onUpdate?: (id: string, text: string) => Promise<boolean>;
  onDelete?: (id: string) => Promise<boolean>;
}
export default function CommentView({ className, comment, disabled, onUpdate, onDelete }: Props) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(comment.text);
  const [pending, setPending] = useState(false);
  const cancel = () => { setDraft(comment.text); setEditing(false); };
  const save = async () => {
    if (!draft.trim() || pending || !onUpdate) return;
    setPending(true);
    try { if (await onUpdate(comment.commentId, draft.trim())) setEditing(false); }
    finally { setPending(false); }
  };
  const remove = async () => {
    if (pending || !onDelete) return;
    setPending(true);
    try { await onDelete(comment.commentId); } finally { setPending(false); }
  };
  return <article className={"comment-card " + (className ?? "")}>
    <div className="comment-avatar">
      {comment.avatarUrl ? <img src={/^https?:\/\//.test(comment.avatarUrl) ? comment.avatarUrl : Config.API_URL + comment.avatarUrl} alt={comment.author} /> : <span>{comment.author?.slice(0, 2).toUpperCase() || "?"}</span>}
    </div>
    <div className="comment-content">
      <header className="comment-meta"><strong>{comment.author}</strong><time dateTime={comment.createdAt}>{new Date(comment.createdAt).toLocaleDateString()}</time></header>
      {editing ? <textarea aria-label="Edit comment" value={draft} disabled={pending} onChange={(e) => setDraft(e.target.value)} /> : <p className="comment-text">{comment.text}</p>}
      {comment.isOwner && <div className="comment-actions">
        {editing ? <>
          <Button style="bar" tone="red" width="90px" height="32px" disabled={pending || disabled} onClick={cancel}>Cancel</Button>
          <Button style="bar" tone="green" width="90px" height="32px" disabled={pending || disabled || !draft.trim()} onClick={() => void save()}>Save</Button>
        </> : <>
          <Button style="bar" tone="purple" width="90px" height="32px" disabled={pending || disabled} onClick={() => { setDraft(comment.text); setEditing(true); }}>Edit</Button>
          <Button style="bar" tone="red" width="90px" height="32px" disabled={pending || disabled} onClick={() => void remove()}>Delete</Button>
        </>}
      </div>}
    </div>
  </article>;
}
