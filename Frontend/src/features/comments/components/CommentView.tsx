import { useState } from "react";
import type { CommentDto } from "../types/models";

interface CommentMessageProps {
  className?: string;
  comment: CommentDto;
  onUpdate?: (id: string, text: string) => void;
  onDelete?: (id: string) => void;
}

export default function CommentView({className,comment,onUpdate,onDelete}: CommentMessageProps) {
  const [isEditMode, setEditMode] = useState(false);
  const [draftText, setDraftText] = useState(comment.text);

  const saveEdit = () => {
    if (!draftText.trim()) return;
    onUpdate?.(comment.commentId, draftText);
    setEditMode(false);
  };

  const cancelEdit = () => {
    setDraftText(comment.text); 
    setEditMode(false);
  };

  return (
    <div className={className}>
      <div className="w-full h-30 bg-gray-400 flex items-center">
        <div className="h-full aspect-square bg-gray-200 p-2" />

        <div className="w-full h-full bg-gray-500 p-2 flex-col gap-2">
          <div className="w-full h-4/6 bg-gray-600 p-2">
            {!isEditMode ? (
              <p>{comment.text}</p>
            ) : (
              <textarea
                className="w-full h-full resize-none border-2 border-black"
                value={draftText}
                onChange={(e) => setDraftText(e.target.value)}
              />
            )}
          </div>

          {comment.isOwner && (
            <div className="w-full h-2/6 bg-gray-800 p-2 flex justify-end gap-2">
              {!isEditMode ? (
                <>
                  <button
                    onClick={() => setEditMode(true)}
                    className="w-30 bg-lime-900 hover:bg-lime-600"
                  >
                    EDIT
                  </button>
                  <button
                    onClick={() => onDelete?.(comment.commentId)}
                    className="w-30 bg-red-900 hover:bg-red-600"
                  >
                    DELETE
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={cancelEdit}
                    className="w-30 bg-red-900 hover:bg-red-600"
                  >
                    CANCEL
                  </button>
                  <button
                    onClick={saveEdit}
                    className="w-30 bg-lime-900 hover:bg-lime-600"
                  >
                    SAVE
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
