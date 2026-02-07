import axios from "axios";
import { useEffect, useState } from "react";

interface CommentMessageProps{
    className?: string
    onSubmit?: (text: string) => void;
}

export default function CommentMessage( {className, onSubmit}: CommentMessageProps) {
  const [commentText, setCommentText] = useState("");

  const handleSubmit = () => {
    if(!commentText.trim()) return;
    if(onSubmit)
        onSubmit(commentText)
    setCommentText("");
  }

  return (
    <div className={className}>
      <div className="w-full h-30 bg-gray-400 flex items-center">
        <div className="h-full aspect-square bg-gray-200 p-2">
          {/* profileAvatar */}
        </div>
        <div className="w-full h-full bg-gray-500 p-2 flex-col gap-2">
          {/* comment message */}
          <div className="w-full h-4/6 bg-gray-600 p-2">
            <textarea
              placeholder="Add comment here..."
              className="w-full h-full resize-none border-2 border-black"
              value={commentText}
              onChange={(e) => {
                setCommentText(e.target.value);
              }}
            />
          </div>
          <div className="w-full h-2/6 bg-gray-800 p-2 flex justify-end gap-2">
            <div
              className="w-50 h-full bg-red-900 hover:bg-red-600"
              onClick={() => setCommentText("")}
            >
              {/* Cancel */}
              <span className="w-full h-full flex justify-center items-center cursor-pointer">
                CANCEL
              </span>
            </div>
            <div
              className="w-50 h-full bg-lime-900 hover:bg-lime-600"
              onClick={handleSubmit}
            >
              {/* Submit */}
              <span className="w-full h-full flex justify-center items-center cursor-pointer">
                SUBMIT
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
