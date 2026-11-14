import { useState } from "react";
import Button from "../../../components/Buttons/Button";

interface Props {
  className?: string;
  disabled?: boolean;
  onSubmit?: (text: string) => Promise<boolean>;
}
export default function CommentMessage({ className, disabled, onSubmit }: Props) {
  const [text, setText] = useState("");
  const [pending, setPending] = useState(false);
  const submit = async () => {
    if (!text.trim() || pending || disabled || !onSubmit) return;
    setPending(true);
    try { if (await onSubmit(text.trim())) setText(""); }
    finally { setPending(false); }
  };
  return <div className={className}><div className="comment-composer">
    <label className="comment-label" htmlFor="new-comment">Your comment</label>
    <textarea id="new-comment" placeholder={disabled ? "Sign in to leave a comment" : "Add your comment..."} value={text} disabled={disabled || pending} onChange={(e) => setText(e.target.value)} />
    <div className="comment-actions">
      <Button style="bar" tone="red" width="110px" height="34px" disabled={disabled || pending || !text} onClick={() => setText("")}>Cancel</Button>
      <Button style="bar" tone="green" width="110px" height="34px" disabled={disabled || pending || !text.trim()} onClick={() => void submit()}>{pending ? "Sending..." : "Submit"}</Button>
    </div>
  </div></div>;
}
